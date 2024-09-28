
const FakeView = () => {

    const selectedUser = {
        image: "https://www.transparentpng.com/thumb/user/gray-user-profile-icon-png-fP8Q1P.png",
        email: "Fake@email.com",
        name: "User"

    }


    return (
        <div className='flex flex-col h-full overflow-hidden bg-black'>
            <div className='p-3 bg-gray-900 text-white'>
                <div className='flex items-center'>
                    <img
                        src={selectedUser.image}
                        className='w-10 h-10 rounded-full mr-2'
                        alt={selectedUser.name}
                    />
                    <div>
                        <h2>{selectedUser.name}</h2>
                        <p className='text-sm'>{selectedUser.email}</p>
                    </div>
                </div>
            </div>

            <ul className='flex-grow overflow-y-auto p-5 max-h-[80vh] bg-black'>



            </ul>

            <div className='p-4 bg-gray-900 flex mt-auto'>
                <input
                    placeholder='Type your message...'
                    className='flex-grow px-4 py-2 rounded-lg border border-gray-300'
                />
                <button
                    className='ml-4 px-4 py-2 bg-blue-500 text-white rounded-lg'
                    type='submit'
                >
                    Send
                </button>
            </div>
        </div>
    );
};

export default FakeView;