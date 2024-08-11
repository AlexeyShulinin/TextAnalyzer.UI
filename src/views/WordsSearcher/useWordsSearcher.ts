import { useLocation, useNavigate } from 'react-router-dom';
import { ChangeEvent, useEffect, useState } from 'react';
import { TextAnalyzer } from 'ash-text-analyzer';

export const useWordsSearcher = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const [text, setText] = useState<string>('');
    const [frequencyRate, setFrequencyRate] = useState<string>('');
    const [textAnalyzer, setTextAnalyzer] = useState<TextAnalyzer>();
    const [predictedWord, setPredictedWord] = useState<string>('');
    const [isCompleted, setIsCompleted] = useState<boolean>(false);

    useEffect(() => {
        const locationState = location?.state;
        if (
            !locationState ||
            !locationState?.textAnalyzer ||
            !locationState.textAnalyzer?.predictNextWord
        ) {
            navigate('/');
            return;
        }

        setTextAnalyzer(locationState.textAnalyzer);
    }, [location?.state]);

    const onChange = (event: ChangeEvent<HTMLInputElement>) => {
        setText(event.target.value);
    };

    const onFrequencyRateChange = (event: ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        if (!isFinite(Number(value))) {
            alert('Please enter number');
            setFrequencyRate('');
            return;
        }

        setFrequencyRate(value);
    };

    const onPredictWord = () => {
        if (!text) {
            alert('Please enter a word');
            return;
        }

        const index = +frequencyRate;
        const predictionResult = textAnalyzer!.predictNextWord(
            text,
            !isNaN(index) ? index : undefined,
        );

        if (predictionResult) {
            setPredictedWord(predictionResult);
        } else {
            setPredictedWord('');
        }

        setIsCompleted(true);
    };

    return {
        text,
        onChange,
        onPredictWord,
        frequencyRate,
        onFrequencyRateChange,
        predictedWord,
        isCompleted,
    };
};
