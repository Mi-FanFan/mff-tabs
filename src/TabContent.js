import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import {
  getTransformByIndex,
  getActiveIndex,
  getTransformPropValue,
  getMarginStyle,
} from './utils'

class TabContent extends Component {

  constructor (props){
    super(props)
    this.getTabPanes = this.getTabPanes.bind(this)
  }

  getTabPanes () {
    const props = this.props
    const activeKey = props.activeKey
    const children = props.children
    const newChildren = []

    React.Children.forEach(children, (child) => {
      if (!child) {
        return
      }
      const key = child.key
      const active = activeKey === key
      newChildren.push(React.cloneElement(child, {
        active,
        destroyInactiveTabPane: props.destroyInactiveTabPane,
        rootPrefixCls: props.prefixCls,
      }))
    })

    return newChildren
  }
  render () {
    const {props} = this
    const {
      prefixCls, children, activeKey,
      tabBarPosition, animated, animatedWithMargin,
    } = props
    let {style} = props
    const classes = classnames({
      [`${prefixCls}-content`]: true,
      [animated ? `${prefixCls}-content-animated` : `${prefixCls}-content-no-animated`]: true,
    })
    if (animated) {
      const activeIndex = getActiveIndex(children, activeKey)
      if (activeIndex !== -1) {
        const animatedStyle = animatedWithMargin ? getMarginStyle(activeIndex, tabBarPosition) : getTransformPropValue(getTransformByIndex(activeIndex, tabBarPosition))
        style = {
          ...style,
          ...animatedStyle,
        }
      } else {
        style = {
          ...style,
          display: 'none',
        }
      }
    }
    return (
      <div
        className={classes}
        style={style}
      >
        {this.getTabPanes()}
      </div>
    )
  }
}

TabContent.propTypes = {
  animated: PropTypes.bool,
  animatedWithMargin: PropTypes.bool,
  prefixCls: PropTypes.string,
  children: PropTypes.any,
  activeKey: PropTypes.string,
  style: PropTypes.any,
  tabBarPosition: PropTypes.string,
}

TabContent.defaultProps = {
  animated: true,
}

export default TabContent
