import React from 'react';

const Question2 = () => {
    return (
        <div className='text-green-600 font-bold  mt-8 p-8'>
            <h3 className='text-center'>When should we use node.js and mongoDB?</h3>
            <p className='text-justify text-gray-400 p-12'>Node.js is an asynchronous event-driven js runtime built on chrome's v8 JS engine. It follows Event-driven-programming paradigm. Event-driven-programming is a programming paradigm in which the flow of the program is determined by events. Node.js handles I/O operations. CPU Intensive Task is handled by server's CPU. On the other hand, server needs to depend on the databases/file-systems or another server to read the data and send the response to the client to handle I/O Intensive Task. Node.js Server is a single threaded runtime that uses the system kernel through libuv library to implement multiple threads behind the scenes to handle multiple requests. That's how node.js handles multiple requests asynchronously and non blocking I/O operations. It is primarily used for non-blocking, event-driven-servers due to its single-threaded nature. It is used for traditional websites and back-end API services. Node.js recommends avoiding highly CPU Intensive Task because that blocks the thread. We operate I/O intensive tasks by using node.js majorly.

            </p>
        </div>
    );
};

export default Question2;