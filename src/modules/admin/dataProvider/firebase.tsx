// import {
//   CreateParams,
//   CreateResult,
//   DataProvider,
//   DeleteManyParams,
//   DeleteManyResult,
//   DeleteParams,
//   DeleteResult,
//   GetListParams,
//   GetListResult,
//   GetManyParams,
//   GetManyReferenceParams,
//   GetManyReferenceResult,
//   GetManyResult,
//   GetOneParams,
//   GetOneResult,
//   RaRecord,
//   UpdateManyParams,
//   UpdateManyResult,
//   UpdateParams,
//   UpdateResult,
// } from 'react-admin'

// import {
//   collection,
//   doc,
//   getDoc,
//   getDocs,
//   getFirestore,
//   setDoc,
//   updateDoc,
// } from 'firebase/firestore'

// import { app } from '@/lib/firebase'

// const db = getFirestore(app)

// async function getList<T extends RaRecord>(
//   resource: string,
//   params: GetListParams
// ): Promise<GetListResult<T>> {
//   const documentSnaps = await getDocs(collection(db, resource))
//   let data = [] as T[]

//   documentSnaps.forEach((doc) => {
//     data.push(doc.data() as T)
//   })

//   return {
//     data,
//     total: 1,
//   }
// }

// async function getOne<T extends RaRecord>(
//   resource: string,
//   params: GetOneParams
// ): Promise<GetOneResult<T>> {
//   const documentRef = doc(db, resource, params.id.toString())
//   const documentSnap = await getDoc(documentRef)

//   const data = documentSnap.data() as T
//   return { data }
// }

// async function getMany<T extends RaRecord>(
//   resource: string,
//   params: GetManyParams
// ): Promise<GetManyResult<T>> {
//   const ids = params.ids
//   const data = await Promise.all(
//     ids.map(async (id) => {
//       const documentRef = doc(db, resource, id.toString())
//       const documentSnap = await getDoc(documentRef)
//       return (await documentSnap.data()) as T
//     })
//   )
//   return { data }
// }

// async function getManyReference<T extends RaRecord>(
//   resource: string,
//   params: GetManyReferenceParams
// ): Promise<GetManyReferenceResult<T>> {
//   return {
//     data: [],
//   }
// }

// async function create<T extends RaRecord>(
//   resource: string,
//   params: CreateParams
// ): Promise<CreateResult<T>> {
//   const documentRef = doc(db, resource, params.data.id)
//   await setDoc(documentRef, params.data)
//   return {
//     data: params.data,
//   }
// }

// async function update<T extends RaRecord>(
//   resource: string,
//   params: UpdateParams
// ): Promise<UpdateResult<T>> {
//   const documentRef = doc(db, resource, params.data.id)
//   await updateDoc(documentRef, params.data)
//   return {
//     data: params.data,
//   }
// }

// async function updateMany<T extends RaRecord>(
//   resource: string,
//   params: UpdateManyParams
// ): Promise<UpdateManyResult<T>> {}

// async function deleteFn<T extends RaRecord>(
//   resource: string,
//   params: DeleteParams
// ): Promise<DeleteResult<T>> {}

// async function deleteMany<T extends RaRecord>(
//   resource: string,
//   params: DeleteManyParams
// ): Promise<DeleteManyResult<T>> {}

// export const dataProvider: DataProvider = {
//   getList,
//   getOne,
//   getMany,
//   getManyReference,
//   create,
//   update,
//   updateMany,
//   delete: deleteFn,
//   deleteMany,
// }

export {}
