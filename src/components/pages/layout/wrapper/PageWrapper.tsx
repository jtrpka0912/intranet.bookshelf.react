// React
import React, { useContext } from 'react';

// Components
import PageHeader from '../header/PageHeader';
import PageSideNav from '../sidenav/PageSideNav';
import PageFooter from '../footer/PageFooter';
import Toast from '../../../common/toast/Toast';

// Temporary
import Button from '../../../common/button/Button';
import { AppContext } from '../../../../contexts/AppContext';

// Styles
import './PageWrapper.scss';

/**
 * @function PageWrapper
 * @summary Page Layout Wrapper
 * @description The layout for all pages for the web app
 * @author J.T.
 * @param { object } props 
 * @returns { React.ReactNode }
 */
const PageWrapper: React.FunctionComponent = (props) => {
    const { toggleToastMessage } = useContext(AppContext);
    return (
        <main className="shelf-page__wrapper">
            <PageSideNav />
            <PageHeader />
            <div className="shelf-page__content">
                { props.children }
            </div>

            <Button onClick={ () => toggleToastMessage('Hello World') }>Toggle Toast</Button>
            <PageFooter />
            <Toast />
        </main>
    );
};

export default PageWrapper;