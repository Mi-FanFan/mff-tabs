import React, { Component } from 'react'
import PropTypes from 'prop-types'
import KeyCode from './KeyCode'
import TabPane from './TabPane'
import classnames from 'classnames'

function noop () {
}

function getDefaultActiveKey (props) {
  let activeKey
  React.Children.forEach(props.children, (child) => {
    if (child && !activeKey && !child.props.disabled) {
      activeKey = child.key
    }
  })
  return activeKey
}

export default class Tabs extends Component {
  constructor (props) {
    super(props)
    this.render = this.render.bind(this)
    this.onTabClick = this.onTabClick.bind(this)
    this.onNavKeyDown = this.onNavKeyDown.bind(this)
    this.setActiveKey = this.setActiveKey.bind(this)
    this.getNextActiveKey = this.getNextActiveKey.bind(this)
    this.onTabClick = this.onTabClick.bind(this)
    this.onTabClick = this.onTabClick.bind(this)

    let activeKey
    if ('activeKey' in props) {
      activeKey = props.activeKey
    } else if ('defaultActiveKey' in props) {
      activeKey = props.defaultActiveKey
    } else {
      activeKey = getDefaultActiveKey(props)
    }

    this.state = {
      activeKey,
    }
  }

  componentWillReceiveProps (nextProps) {
    if ('activeKey' in nextProps) {
      this.setState({
        activeKey: nextProps.activeKey,
      })
    }
  }

  onTabClick (activeKey) {
    if (this.tabBar.props.onTabClick) {
      this.tabBar.props.onTabClick(activeKey)
    }
    this.setActiveKey(activeKey)
  }

  onNavKeyDown (e) {
    const eventKeyCode = e.keyCode
    if (eventKeyCode === KeyCode.RIGHT || eventKeyCode === KeyCode.DOWN) {
      e.preventDefault()
      const nextKey = this.getNextActiveKey(true)
      this.onTabClick(nextKey)
    } else if (eventKeyCode === KeyCode.LEFT || eventKeyCode === KeyCode.UP) {
      e.preventDefault()
      const previousKey = this.getNextActiveKey(false)
      this.onTabClick(previousKey)
    }
  }

  setActiveKey (activeKey) {
    if (this.state.activeKey !== activeKey) {
      if (!('activeKey' in this.props)) {
        this.setState({
          activeKey,
        })
      }
      this.props.onChange(activeKey)
    }
  }

  getNextActiveKey (next) {
    const activeKey = this.state.activeKey
    const children = []
    React.Children.forEach(this.props.children, (c) => {
      if (c && !c.props.disabled) {
        if (next) {
          children.push(c)
        } else {
          children.unshift(c)
        }
      }
    })
    const length = children.length
    let ret = length && children[0].key
    children.forEach((child, i) => {
      if (child.key === activeKey) {
        if (i === length - 1) {
          ret = children[0].key
        } else {
          ret = children[i + 1].key
        }
      }
    })
    return ret
  }

  render () {
    const {
      className,
      prefixCls,
      renderTabBar,
      hasTabHeader,
      tabBarPosition, 
      renderTabContent,
    } = this.props
    , props = this.props


    const cls = classnames({
      [prefixCls]: 1,
      [className]: !!className,
      [`${prefixCls}-${tabBarPosition}`]: 1,
    })

    this.tabBar = renderTabBar()
    const contents = [
      React.cloneElement(renderTabContent(), {
        prefixCls,
        tabBarPosition,
        key: 'tabContent',
        children: props.children,
        onChange: this.setActiveKey,
        activeKey: this.state.activeKey,
        destroyInactiveTabPane: props.destroyInactiveTabPane,
      }),
    ]

    hasTabHeader && contents.unshift(
      React.cloneElement(this.tabBar, {
        prefixCls,
        key: 'tabBar',
        tabBarPosition,
        panels: props.children,
        onTabClick: this.onTabClick,
        onKeyDown: this.onNavKeyDown,
        activeKey: this.state.activeKey,
      })
    )

    if (tabBarPosition === 'bottom') {
      contents.reverse()
    }
    return (
      <div
        className={cls}
        style={props.style}
      >
        {contents}
      </div>
    )
  }
}

Tabs.propTypes = {
  style: PropTypes.object,
  children: PropTypes.any,
  onChange: PropTypes.func,
  prefixCls: PropTypes.string,
  className: PropTypes.string,
  activeKey: PropTypes.string,
  tabBarPosition: PropTypes.string,
  defaultActiveKey: PropTypes.string,
  destroyInactiveTabPane: PropTypes.bool,

  renderTabBar: PropTypes.func.isRequired,
  renderTabContent: PropTypes.func.isRequired,
}

Tabs.defaultProps = {
  style: {},
  onChange: noop,
  hasTabHeader: true,
  prefixCls: 'rc-tabs',
  tabBarPosition: 'top',
  destroyInactiveTabPane: false,
}

Tabs.TabPane = TabPane
