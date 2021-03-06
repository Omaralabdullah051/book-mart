import React from 'react';
import PageTitle from '../Shared/PageTitle/PageTitle';
import Question1 from './Question1/Question1';
import Question2 from './Question2/Question2';
import Question3 from './Question3/Question3';
import Question4 from './Question4/Question4';

const Blogs = () => {
    return (
        <div>
            <PageTitle title="Blogs" />
            <Question1 />
            <Question2 />
            <Question3 />
            <Question4 />
        </div>
    );
};

export default Blogs;