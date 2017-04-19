import React, { Component }from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'

class TabPane extends Component {

  render () {
    const props = this.props
    const {className, destroyInactiveTabPane, active, forceRender} = props
    this._isActived = this._isActived || active
    const prefixCls = `${props.rootPrefixCls}-tabpane`
    const cls = classnames({
      [prefixCls]: 1,
      [`${prefixCls}-inactive`]: !active,
      [`${prefixCls}-active`]: active,
      [className]: className,
    })
    const isRender = destroyInactiveTabPane ? active : this._isActived
    return (
      <div
        style={props.style}
        role="tabpanel"
        aria-hidden={props.active ? 'false' : 'true'}
        className={cls}
      >
        {isRender || forceRender ? props.children : props.placeholder}
      </div>
    )
  }
}
TabPane.propTypes = {
  className: PropTypes.string,
  active: PropTypes.bool,
  style: PropTypes.any,
  destroyInactiveTabPane: PropTypes.bool,
  forceRender: PropTypes.bool,
  placeholder: PropTypes.node,
}

TabPane.defaultProps = {
  placeholder: null
}
export default TabPane
