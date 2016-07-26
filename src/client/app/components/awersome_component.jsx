import React from 'react';
import CakeChart from 'cake-chart';

const TREE = {
  value: 100,
  fill: "black"
  label: 'Life levels',
  children: [{
    value: 16,
    children: [{
      value: 16,
      children: [{
        value: 16
      }]
    }]
    }, {
      value: 16
    }, {
      value: 16
    }]
};

class AwesomeComponent extends React.Component {
  handleClick() {
    console.log("koko");
  }

  render() {
    return (
      <div>
        <CakeChart data={TREE} onClick={this.handleClick}
                 coreRadius={120}
                 ringWidth={80}
                 ringWidthFactor={0.6}/>
      </div>
    );
  }

}

export default AwesomeComponent;
