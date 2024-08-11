import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import TextAnalyzer from '../views/TextAnalyzer';
import WordsSearcher from '../views/WordsSearcher';

export const router = createBrowserRouter([
    {
        path: '/',
        element: <TextAnalyzer />,
    },
    {
        path: '/result',
        element: <WordsSearcher />,
    },
]);
