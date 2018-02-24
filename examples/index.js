import {render} from 'react-dom'
import PropTypes from 'prop-types'
import React, {Component} from 'react'

import InkTabBar from '../src/InkTabBar'
import TabContent from '../src/TabContent'
import MffTabs, { TabPane } from '../src/index.js'
import SwipeableInkTabBar from '../src/SwipeableInkTabBar'
import SwipeableTabContent from '../src/SwipeableTabContent'
import './index.less'

class Tabs extends Component {
  constructor (props) {
    super(props)
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange (activeKey) {
    const {onChange} = this.props
    if (onChange) {
      onChange(activeKey)
    }
  }

  renderTabBar = () => {
  const {children, animated, speed, pageSize, tabBarhammerOptions, onTabClick} = this.props
if (children.length > pageSize) {
  return (
    <SwipeableInkTabBar
  onTabClick={onTabClick}
  speed={speed}
  pageSize={pageSize}
  hammerOptions={tabBarhammerOptions}
  />
)
}
return <InkTabBar inkBarAnimated={animated} onTabClick={onTabClick}/>
}

renderTabContent = () => {
  const {animated, swipeable, hammerOptions} = this.props
  return swipeable ? (
    <SwipeableTabContent animated={animated} hammerOptions={hammerOptions}/>
) : (
  <TabContent animated={animated}/>
)
}

render () {
  return (
    <MffTabs
      renderTabBar={this.renderTabBar}
      renderTabContent={this.renderTabContent}
      {...this.props}
    />
)
}

}
Tabs.propTypes = {
  activeKey: PropTypes.string,
  defaultActiveKey: PropTypes.string,
  onChange: PropTypes.func,
  onTabClick: PropTypes.func,
  onPrevClick: PropTypes.func,
  onNextClick: PropTypes.func,
  tabBarExtraContent: PropTypes.node,
  tabBarStyle: PropTypes.object,
  tabPosition: PropTypes.oneOf(['top', 'bottom']),
  style: PropTypes.object,
  prefixCls: PropTypes.string,
  className: PropTypes.string,
  animated: PropTypes.bool,
  swipeable: PropTypes.bool,
  children: PropTypes.any,
  destroyInactiveTabPane: PropTypes.bool,
  pageSize: PropTypes.number,
  speed: PropTypes.number,
  tabBarhammerOptions: PropTypes.any,
  hammerOptions: PropTypes.any,
}

Tabs.defaultProps = {
  prefixCls: 'mi-tabs',
  animated: true,
  swipeable: true,
  tabBarPosition: 'top',
  hammerOptions: {
    recognizers: {
      swipe: { disable : true }
    },
    touchAction:'none'
  },
  tabBarhammerOptions: {},
  pageSize: 4,
  speed: 8,
  onChange() {},
  onTabClick() {},
}

function callback(key) {
  console.log('onChange', key);
}
function handleTabClick(key) {
  console.log('onTabClick', key);
}


class Examples extends React.Component {

  render() {
    return (
      <Tabs  onChange={callback} onTabClick={handleTabClick}>
      <TabPane tab="选项卡一" key="4">
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#fff' }}>
          选项卡一内容<br/>
          选项卡一内容<br/>
          选项卡一内容<br/>
          选项卡一内容<br/>
          选项卡一内容<br/>
          选项卡一内容<br/>
          选项卡一内容<br/>
          选项卡一内容<br/>
          选项卡一内容<br/>
          选项卡一内容<br/>
          选项卡一内容<br/>
          选项卡一内容<br/>
          选项卡一内容<br/>
          选项卡一内容<br/>
          选项卡一内容<br/>
          选项卡一内容<br/>
          选项卡一内容<br/>
          选项卡一内容<br/>
          选项卡一内容<br/>
          选项卡一内容<br/>
          选项卡一内容<br/>
          选项卡一内容<br/>
          选项卡一内容<br/>
          选项卡一内容<br/>
          选项卡一内容<br/>
          选项卡一内容<br/>
          选项卡一内容<br/>
          选项卡一内容<br/>
          选项卡一内容<br/>
          选项卡一内容<br/>
          选项卡一内容<br/>
          选项卡一内容<br/>
          选项卡一内容<br/>
          选项卡一内容<br/>
          选项卡一内容<br/>
          选项卡一内容<br/>
          选项卡一内容<br/>
          选项卡一内容<br/>
          选项卡一内容<br/>
          选项卡一内容<br/>
          选项卡一内容<br/>
          选项卡一内容<br/>
          选项卡一内容<br/>
          选项卡一内容<br/>
          选项卡一内容<br/>
          选项卡一内容<br/>
          选项卡一内容<br/>
          选项卡一内容<br/>
          选项卡一内容<br/>
          选项卡一内容<br/>
          选项卡一内容<br/>
          选项卡一内容<br/>
          选项卡一内容<br/>
          选项卡一内容<br/>
          选项卡一内容<br/>
          选项卡一内容<br/>
          选项卡一内容<br/>
          选项卡一内容<br/>
          选项卡一内容<br/>
          选项卡一内容<br/>
          选项卡一内容<br/>
          选项卡一内容<br/>
          选项卡一内容<br/>
          选项卡一内容<br/>
          选项卡一内容<br/>
          选项卡一内容<br/>
          选项卡一内容<br/>
          选项卡一内容<br/>
          选项卡一内容<br/>
          选项卡一内容<br/>
          选项卡一内容<br/>
          选项卡一内容<br/>
          选项卡一内容<br/>
       </div>
    </TabPane>
    <TabPane tab="选项卡二" key="3">
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '5rem', backgroundColor: '#fff' }}>
    选项卡二内容
    </div>
    </TabPane>
    <TabPane tab="选项卡三" key="2">
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '5rem', backgroundColor: '#fff' }}>
    选项卡三内容
    </div>
    </TabPane>
    <TabPane tab="选项卡四" key="1">
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '5rem', backgroundColor: '#fff' }}>
    选项卡四内容
    </div>
    </TabPane>
    </Tabs>
  );
  }
};


render(<Examples />, document.getElementById('root'))