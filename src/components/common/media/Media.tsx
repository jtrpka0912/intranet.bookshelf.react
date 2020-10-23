// React
import React from 'react';

// Styles
import './Media.scss';

// Assets
import DefaultPlaceHolder from './media-placeholder.png';

/**
 * @interface MediaProps
 * @description The acceptable props for the Media component
 * @author J.T.
 * @property { string } type
 * @property { string } src
 * @property { string } alt
 * @property { string } title
 * @property { string } width
 * @property { string } height
 */
interface MediaProps {
    type?: 'image' | 'iframe' | 'video',
    src?: string,
    alt?: string,
    title? : string,
    width?: string,
    height?: string,
};

/**
 * @function Media
 * @summary Media component
 * @description A responsive media component for images, videos, and iframes.
 * @author J.T.
 * @returns { React.ReactNode }
 */
const Media: React.FunctionComponent<MediaProps> = (props) => {

    const renderImage = () => {
        return (
            <figure className="common-media common-media--image">
                <img src={ props.src } alt={ props.alt } width={ props.width } height={ props.height } />

                <hr />

                { props.title ? (<figcaption>{ props.title }</figcaption>) : null }
            </figure>
        );
    };

    const renderInlineFrame = () => {
        const styles = {
            width: props.width,
            height: props.height
        };

        // TODO: Inline styles not showing let alone working.

        return (
            <div className="common-media common-media--iframe" style={ styles }>
                <div className="common-media__container">
                    <iframe src={ props.src } title={ props.title } width={ props.width } height={ props.height } />
                </div>
            </div>
        );
    };

    const renderVideo = () => {
        return (
            <div className="common-media common-media--video"></div>
        );
    }

    switch(props.type) {
        case 'image':
            return renderImage();
        case 'iframe':
            return renderInlineFrame();
        case 'video':
            return renderVideo();
        default:
            return null;
    }
};

Media.defaultProps = {
    type: 'image',
    src: DefaultPlaceHolder,
    alt: 'Placeholder'
};

export default Media;