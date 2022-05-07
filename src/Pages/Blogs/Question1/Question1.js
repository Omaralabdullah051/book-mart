import React from 'react';

const Question1 = () => {
    return (
        <div className='text-green-600 font-bold md:mt-8 p-6 md:p-8'>
            <h6 className='md:text-2xl xl:text-4xl text-center'>What's the Difference between Javascript and Node.js?</h6>
            <p className='text-xs md:text-sm xl:text-base text-justify text-gray-400 mt-5 md:mt-0 md:p-12'>Javascript is a High-level, Interpreted or Just in time Compiled, Dynamically-typed, Multi-Paradigm, Prototype-based, Single-Threaded, Non-Blocking, Asynchronous Language meanwhile Node.js is an asynchronous event-driven JS runtime built on chrome's v8 JS engine. Javascript basically can run in the browser whereas Javascript can run outside the browser with the help of node.js . Basically JS used in client side and node.js mostly used on the server side. JS is capable enough to add HTML and manipulates DOM meanwhile node.js doesn't has capability to add HTML or manipulates DOM. JS can run in any browser engine like JS core, spidermonkey etc whereas node.js is built based on chrome's v8 engine. JS mostly used in front-end-development and node.js is widely used in back-end-development. Angular.js, Vue.js etc are the frameworks of JS whereas Next.js, Express.js etc are the frameworks of node.js . JS uses v8 engine which is written in C++ meanwhile node.js is written in c,c++ and JS.</p>
        </div>
    );
};

export default Question1;