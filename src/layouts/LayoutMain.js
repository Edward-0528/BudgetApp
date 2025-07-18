import React from 'react';
import Header from '../components/Header';
import ContentMain from '../components/ContentMain';
function LayoutMain() {
  return (
    <div className="min-h-screen bg-zinc-900 h-full">
      <Header />

        <ContentMain />

    </div>
  );
}
export default LayoutMain;