import React from 'react';

const Question3 = () => {
    return (
        <div className='text-green-600 font-bold  mt-8 p-8'>
            <h3 className='text-center'>What's the differences between SQL and NoSQL databases?</h3>
            <p className='text-justify text-gray-400 p-12'>SQL database is a relational database and NoSQL database is a non-relational database. In SQL databases, data is stored in a predefined structure and in tabular format meanwhile in NoSQL databases, data can be stored without having a predefined structure and in many ways such as document-oriented, column-oriented, graph-based or key-value pairs. SQL databases are vertically scalable and NoSQL databases horizontally scalable. SQL Follows ACID properties(Atomicity, Consistency, Isolation and Durability) whereas NoSQL Follows CAP theorem (Consistency, Availability and partition tolerance). MySQL is consider as a SQL database that uses Structured Query Language to access the database and data is stored in a predefined structure. MongoDB is consider as a NoSQL database that is a document-oriented database and stores data in JSON-like BSON formate as documents and data can be stored without having a predefined structure. It has dynamic schema.</p>
        </div>
    );
};

export default Question3;