import {
    FirebaseAuthProvider,
    FirebaseDataProvider,
    RAFirebaseOptions,

} from 'react-admin-firebase'

import { firebaseConfig, } from '@/lib/firebase'

const options: RAFirebaseOptions = {
    // Prevent destructive damage to data
    softDelete: true,
}

export const dataProvider = FirebaseDataProvider(firebaseConfig, options)
export const authProvider = FirebaseAuthProvider(firebaseConfig, options)
