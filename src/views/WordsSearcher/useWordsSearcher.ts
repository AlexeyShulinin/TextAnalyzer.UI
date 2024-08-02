import { useLocation, useNavigate } from 'react-router-dom';
import { ChangeEvent, useEffect, useState } from 'react';
import TextAnalyzer from 'ash-text-analyzer';

export const useWordsSearcher = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const [text, setText] = useState<string>('');
    const [frequencyRate, setFrequencyRate] = useState<number | null>(null);
    const [textAnalyzer, setTextAnalyzer] = useState<TextAnalyzer>();
    const [predictedWord, setPredictedWord] = useState<string>('');
    const [isCompleted, setIsCompleted] = useState<boolean>(false);

    useEffect(() => {
        const locationState = location?.state;
        if (
            locationState &&
            locationState?.textAnalyzer &&
            locationState.textAnalyzer?.predictNextWord
        ) {
            setTextAnalyzer(locationState.textAnalyzer);
        } else {
            navigate('/');
        }
    }, [location?.state]);

    function handleTextChange(event: ChangeEvent<HTMLTextAreaElement>) {
        setText(event.target.value);
    }

    function handleFrequencyRateChange(
        event: ChangeEvent<HTMLTextAreaElement>,
    ) {
        if (event.target.value === '') {
            setFrequencyRate(null);
            return;
        }

        const value = Number(event.target.value);
        if (isFinite(value)) {
            setFrequencyRate(value);
        } else {
            alert('Please enter number');
            setFrequencyRate(null);
        }
    }

    function handlePredictWord() {
        if (!text) {
            alert('Please enter a word');
        } else {
            const predictionResult = textAnalyzer!.predictNextWord(
                text,
                frequencyRate !== null ? frequencyRate : undefined,
            );
            if (predictionResult) {
                setPredictedWord(predictionResult);
            } else {
                setPredictedWord('');
            }
            setIsCompleted(true);
        }
    }

    return {
        text,
        onChange: handleTextChange,
        onPredictWord: handlePredictWord,
        frequencyRate,
        onFrequencyRateChange: handleFrequencyRateChange,
        predictedWord,
        isCompleted,
    };
};
