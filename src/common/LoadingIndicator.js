import React from 'react';
import { Spin } from 'antd';

export default function LoadingIndicator(props) {
    // const antIcon = <Icon type="loading-3-quarters" style={{ fontSize: 30 }} spin />;
    return (
        <Spin style = {{display: 'block', textAlign: 'center', marginTop: 30}} />
    );
}