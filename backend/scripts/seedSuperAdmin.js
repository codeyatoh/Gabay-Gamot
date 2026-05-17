import "dotenv/config";
import { FieldValue } from "firebase-admin/firestore";
import { getFirebaseAuth, getFirebaseDb } from "../src/config/firebaseAdmin.js";

const ROLE = "super_admin";

function requireEnv(name) {
  const value = process.env[name];

  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }

  return value;
}

function getBooleanEnv(name, defaultValue = false) {
  const value = process.env[name];

  if (!value) {
    return defaultValue;
  }

  return ["1", "true", "yes", "on"].includes(value.toLowerCase());
}

async function getOrCreateSuperAdmin(auth, { email, password, displayName, resetPassword }) {
  try {
    const existingUser = await auth.getUserByEmail(email);
    const updatePayload = {
      displayName,
      emailVerified: true,
      disabled: false,
    };

    if (resetPassword) {
      updatePayload.password = password;
    }

    return {
      user: await auth.updateUser(existingUser.uid, updatePayload),
      created: false,
      passwordReset: resetPassword,
    };
  } catch (error) {
    if (error.code !== "auth/user-not-found") {
      throw error;
    }

    return {
      user: await auth.createUser({
        email,
        password,
        displayName,
        emailVerified: true,
        disabled: false,
      }),
      created: true,
      passwordReset: false,
    };
  }
}

async function seedSuperAdmin() {
  const email = requireEnv("SUPER_ADMIN_EMAIL").toLowerCase();
  const password = requireEnv("SUPER_ADMIN_PASSWORD");
  const displayName = process.env.SUPER_ADMIN_DISPLAY_NAME || "GabayGamot Super Admin";
  const firstName = process.env.SUPER_ADMIN_FIRST_NAME || "Super";
  const lastName = process.env.SUPER_ADMIN_LAST_NAME || "Admin";
  const resetPassword = getBooleanEnv("SUPER_ADMIN_RESET_PASSWORD", false);

  if (password.length < 8) {
    throw new Error("SUPER_ADMIN_PASSWORD must be at least 8 characters long.");
  }

  const auth = getFirebaseAuth();
  const db = getFirebaseDb();
  const { user, created, passwordReset } = await getOrCreateSuperAdmin(auth, {
    email,
    password,
    displayName,
    resetPassword,
  });

  await auth.setCustomUserClaims(user.uid, {
    role: ROLE,
    superAdmin: true,
  });

  const userRef = db.collection("users").doc(user.uid);
  const snapshot = await userRef.get();

  await userRef.set(
    {
      uid: user.uid,
      email,
      displayName,
      firstName,
      lastName,
      role: ROLE,
      status: "active",
      barangayCode: null,
      barangayId: null,
      facilityId: null,
      mustChangePassword: true,
      createdBy: "seed:super-admin",
      createdFromRequestId: null,
      isSeedAccount: true,
      updatedAt: FieldValue.serverTimestamp(),
      ...(snapshot.exists ? {} : { createdAt: FieldValue.serverTimestamp() }),
    },
    { merge: true }
  );

  await db.collection("systemSettings").doc("bootstrap").set(
    {
      superAdminUid: user.uid,
      superAdminEmail: email,
      seededAt: FieldValue.serverTimestamp(),
      seededBy: "seed:super-admin",
    },
    { merge: true }
  );

  console.log("Super Admin seed complete");
  console.log(`- uid: ${user.uid}`);
  console.log(`- email: ${email}`);
  console.log(`- authUserCreated: ${created}`);
  console.log(`- passwordReset: ${passwordReset}`);
  console.log(`- role: ${ROLE}`);
}

seedSuperAdmin().catch((error) => {
  console.error("Super Admin seed failed");
  console.error(error.message);
  process.exitCode = 1;
});
