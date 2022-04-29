import React from 'react';
import {Card} from 'primereact/card';

function ContentLoading() {
  return (
    <Card className="loading">
      <i className="pi pi-spin pi-spinner"></i> Loading...
    </Card>
  );
}

export default ContentLoading;