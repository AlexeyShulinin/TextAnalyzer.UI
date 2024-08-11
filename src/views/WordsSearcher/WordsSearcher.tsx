import React, { JSX } from 'react';
import { Button, Label, Input } from 'text-analyzer-ui-kit';

import '../../assets/layout.css';

import { useWordsSearcher } from './useWordsSearcher';

const WordsSearcher = (): JSX.Element => {
    const {
        text,
        onChange,
        onPredictWord,
        frequencyRate,
        onFrequencyRateChange,
        predictedWord,
        isCompleted,
    } = useWordsSearcher();

    return (
        <div className="width-500 d-flex direction-column">
            {isCompleted && (
                <div className="pb-3 d-flex direction-column flex-around prediction-result">
                    {predictedWord ? (
                        <>
                            <div className="pr-3">
                                <Label text="Success" variant="success" />
                            </div>
                            <div>
                                <Input
                                    value={predictedWord}
                                    readOnly={true}
                                    onClick={() =>
                                        navigator.clipboard.writeText(
                                            predictedWord,
                                        )
                                    }
                                />
                            </div>
                        </>
                    ) : (
                        <div className="py-3">
                            <Label text="No matched word" variant="warning" />
                        </div>
                    )}
                </div>
            )}
            <div>
                <div className="py-2">
                    <Label text="Text to search:" />
                </div>
                <div className="py-2">
                    <Input value={text} onChange={onChange} />
                </div>
                <div className="py-2">
                    <Label text="Frequency:" />
                </div>
                <div className="py-2">
                    <Input
                        value={frequencyRate}
                        onChange={onFrequencyRateChange}
                    />
                </div>
                <div className="py-2 d-flex flex-center ">
                    <Button
                        type="button"
                        label="Predict next"
                        variant="secondary"
                        size="large"
                        onClick={onPredictWord}
                    />
                </div>
            </div>
        </div>
    );
};

export default WordsSearcher;
