import { FirebaseAuthProvider, FirebaseDataProvider, RAFirebaseOptions } from 'react-admin-firebase'

import { firebaseConfig } from '@/lib/firebase'

const options: RAFirebaseOptions = {
  softDelete: true, // Prevent destructive damage to data
}

export const dataProvider = FirebaseDataProvider(firebaseConfig, options)
export const authProvider = FirebaseAuthProvider(firebaseConfig, options)
