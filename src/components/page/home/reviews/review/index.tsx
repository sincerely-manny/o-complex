/* eslint-disable react/no-danger */

import './style.css';
import sanitizeHtml from 'sanitize-html';

type ReviewProps = {
    review: {
        id: number;
        text: string;
    };
};

export default function Review({ review: { text } }: ReviewProps) {
    const escapedText = sanitizeHtml(text, {
        disallowedTagsMode: 'escape',
    });
    return (
        <div
            className="bg-grey-light review rounded px-6 py-5"
            dangerouslySetInnerHTML={{
                __html: escapedText,
            }}
        />
    );
}
