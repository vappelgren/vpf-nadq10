import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, CartesianGrid } from 'recharts';
import type { Language } from '../types';
import { translations } from '../constants/translations';

interface FeedbackChartsProps {
    language: Language;
}

const FeedbackCharts: React.FC<FeedbackChartsProps> = ({ language }) => {
    const t = translations[language];

    const data = [
        { name: t.chartLabels.satisfaction, mentions: 24 },
        { name: t.chartLabels.energy, mentions: 15 },
        { name: t.chartLabels.mentalClarity, mentions: 14 },
        { name: t.chartLabels.cardioHealth, mentions: 6 },
        { name: t.chartLabels.value, mentions: 4 },
    ];

    return (
        <div className="w-full h-96 bg-white/40 p-6 rounded-lg shadow-lg mt-8 flex flex-col">
            <h3 className="text-xl font-bold text-center mb-4 text-gray-900 flex-shrink-0">{t.feedbackChartTitle}</h3>
            <div className="w-full flex-grow">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={data} layout="vertical" margin={{ top: 20, right: 30, left: 10, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.2} />
                        <XAxis type="number" stroke="#4b5563" tick={{ fill: '#1f2937' }} />
                        <YAxis type="category" dataKey="name" width={180} tick={{ fill: '#1f2937', fontSize: 12 }} />
                        <Tooltip 
                            cursor={{fill: 'rgba(80, 115, 40, 0.1)'}}
                            contentStyle={{ backgroundColor: 'rgba(255,255,255,0.8)', border: '1px solid #d1d5db' }}
                            labelStyle={{ color: '#111827' }}
                        />
                        <Legend verticalAlign="top" align="right" wrapperStyle={{ color: '#1f2937' }}/>
                        <Bar dataKey="mentions" name={language === 'es' ? 'Menciones' : 'Mentions'} fill="#507328" barSize={20} />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default FeedbackCharts;