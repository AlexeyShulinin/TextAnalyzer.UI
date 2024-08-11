import React, { JSX, useMemo } from 'react';
import {
    Button,
    Form,
    Label,
    TextArea,
    Select,
    Input,
} from 'text-analyzer-ui-kit';

import '../../assets/layout.css';

import { useText } from './useText';
import { INPUT_SOURCE, INPUT_SOURCE_OPTIONS } from './constants';

const TextAnalyzer = (): JSX.Element => {
    const {
        text,
        onTextChange,
        onFileInputChange,
        onSubmit,
        textSource,
        onTextSourceChange,
    } = useText();

    const isFileOption = useMemo(
        () => textSource === INPUT_SOURCE.FILE,
        [textSource],
    );

    return (
        <Form label="Text analyzer" onSubmit={onSubmit}>
            <div>
                <div className="d-flex flex-end">
                    {isFileOption && (
                        <div>
                            <Input
                                type="file"
                                accept=".txt"
                                onChange={onFileInputChange}
                            />
                        </div>
                    )}
                    <div>
                        <Select
                            options={INPUT_SOURCE_OPTIONS}
                            value={textSource}
                            onChange={onTextSourceChange}
                        />
                    </div>
                </div>
                <div className="py-2">
                    <Label
                        text={
                            isFileOption
                                ? 'File content preview:'
                                : 'Input text to process:'
                        }
                    />
                </div>
                <div className="py-2">
                    <TextArea value={text} onChange={onTextChange} />
                </div>
                <div className="pt-2 d-flex flex-end">
                    <Button
                        type="submit"
                        label="Analyze"
                        variant="primary"
                        size="large"
                    />
                </div>
            </div>
        </Form>
    );
};

export default TextAnalyzer;
