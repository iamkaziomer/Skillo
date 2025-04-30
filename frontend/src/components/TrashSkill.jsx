import React from 'react'

const TrashSkill = ({fetchData,deleteSkill,setDeleteModal,currentSkill}) => {
  return (
    <div  className="fixed top-1/2 left-1/2 z-50 w-[90%] max-w-xl -translate-x-1/2 -translate-y-1/2 rounded-2xl border border-gray-200 bg-white/80 backdrop-blur-lg shadow-2xl p-6 flex flex-col gap-4">
        <h1 className='text-xl text-red-700 font-semibold'>Are you sure you want to delete this skill?</h1>
        <p>{currentSkill.title}</p>
        <div className='flex gap-4 justify-end'>
            <button className='bg-red-500 text-white px-4 py-2 rounded-xl hover:bg-red-600 transition' onClick={async ()=>{
                await deleteSkill(currentSkill._id)
                await fetchData()
                setDeleteModal(false)
            }}>Delete</button>
            <button className='bg-gray-500 text-white px-4 py-2 rounded-xl hover:bg-gray-600 transition' onClick={()=>setDeleteModal(false)}>Cancel</button>
    </div>
    </div>
  )
}

export default TrashSkill