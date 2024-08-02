import { ChangeEvent, FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TextAnalyzer from 'ash-text-analyzer';

export const useText = () => {
    const [text, setText] = useState<string>('');
    const [textSource, setTextSource] = useState<number>(1);
    const navigate = useNavigate();

    function handleTextChange(event: ChangeEvent<HTMLTextAreaElement>) {
        setText(event.target.value);
    }

    function handleTextSourceChange(event: ChangeEvent<HTMLSelectElement>) {
        setTextSource(Number(event.target.value));
    }

    function handleFormSubmit(event: FormEvent) {
        if (text !== '') {
            event.preventDefault();
            const textAnalyzer = new TextAnalyzer(text);
            navigate(`/result`, {
                state: {
                    textAnalyzer: textAnalyzer,
                },
            });
        } else {
            alert('Please enter a valid text');
        }
    }

    function handleFileInput(event: ChangeEvent<HTMLInputElement>) {
        if (event.target.files && event.target.files[0]) {
            const file = event.target.files[0];
            const reader = new FileReader();

            reader.addEventListener(
                'load',
                () => {
                    const result = reader.result;
                    if (result && typeof result === 'string') {
                        setText(result);
                    } else {
                        alert(`Could not upload file`);
                    }
                },
                false,
            );

            if (file) {
                reader.readAsText(file);
            }
        } else {
            alert(`Could not upload file`);
        }
    }

    return {
        text,
        onTextChange: handleTextChange,
        onFileInputChange: handleFileInput,
        onSubmit: handleFormSubmit,
        textSource,
        onTextSourceChange: handleTextSourceChange,
    };
};
