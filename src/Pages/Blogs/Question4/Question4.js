import React from 'react';

const Question4 = () => {
    return (
        <div className='text-green-600 font-bold md:mt-8 p-6 md:p-8'>
            <h6 className='md:text-2xl xl:text-4xl text-center'>What is the purpose of JWT and how does it work?</h6>
            <p className='text-xs md:text-sm xl:text-base text-justify text-gray-400 mt-5 md:mt-0 md:p-12'>Json Web Token is an open standard for securely transmitting information between two parties(a client and a server) as a JSON object. There are many ways for securely transmitting information between client and server. But JWT is considered as the most secure token than other tokens for it's internal mechanism. It can be used for an authentication system and can also be used for information exchange.  The purpose of using JWT is not to hide data but to ensure the authenticity of the data. JWT is signed and encoded, not encrypted. It is a token-based stateless authentication mechanism. Since it is a client-side based stateless session, the server doesn't have to completely rely on a database to save session information. The token is mainly composed of header, payload and signature. A header in JWT describes the cryptographic operations applied to the JWT. In payload, all the user data is actually added. Signature is used to verify the authenticity of a token.
            </p>
        </div>
    );
};

export default Question4;