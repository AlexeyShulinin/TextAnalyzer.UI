import { ChangeEvent, FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TextAnalyzer } from 'ash-text-analyzer';
import { INPUT_SOURCE } from './constants';
import { readFile } from '../../helpers/fileHelper';

export const useText = () => {
    const [text, setText] = useState<string>('');
    const [textSource, setTextSource] = useState<number>(INPUT_SOURCE.TEXT);
    const navigate = useNavigate();

    const onTextChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
        setText(event.target.value);
    };

    const onTextSourceChange = (event: ChangeEvent<HTMLSelectElement>) => {
        const source = Number(event.target.value);
        if (isNaN(source)) {
            alert('Invalid source');
            return;
        }

        setTextSource(source);
    };

    const onSubmit = (event: FormEvent) => {
        event.preventDefault();

        if (!text) {
            alert('Please enter a valid text');
            return;
        }

        const textAnalyzer = new TextAnalyzer(text);
        navigate(`/result`, {
            state: {
                textAnalyzer: textAnalyzer,
            },
        });
    };

    const onFileInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        if (!event.target.files || !event.target.files[0]) {
            alert(`Could not upload file`);
            return;
        }

        readFile(event.target.files[0])
            .then(
                (result) => {
                    setText(result);
                },
                (error) => {
                    alert(error);
                },
            )
            .catch((error) => alert(error));
    };

    return {
        text,
        onTextChange,
        onFileInputChange,
        onSubmit,
        textSource,
        onTextSourceChange,
    };
};
