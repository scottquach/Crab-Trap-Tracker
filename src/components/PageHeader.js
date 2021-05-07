import { useContext } from 'react';
import { PageHeaderContext } from '../contexts/PageHeaderContext';

const PageHeader = () => {
    const { header } = useContext(PageHeaderContext);

    return <h3 className="text-left w-full font-bold mt-2">{header}</h3>;
};

export default PageHeader;
