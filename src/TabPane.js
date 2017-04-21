import React, { Component }from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

class TabPane extends Component {

  render () {
    const props = this.props
    const {className, destroyInactiveTabPane, active, forceRender,placeholder,innerHtml,children} = props
    this._isActived = this._isActived || active
    const prefixCls = `${props.rootPrefixCls}-tabpane`
    const cls = classNames({
      [prefixCls]: 1,
      [`${prefixCls}-inactive`]: !active,
      [`${prefixCls}-active`]: active,
      [className]: className,
    })
    const isRender = destroyInactiveTabPane ? active : this._isActived
    if (innerHtml){
      return (
        <div
          style={props.style}
          role="tabpanel"
          aria-hidden={props.active ? 'false' : 'true'}
          className={cls}
          dangerouslySetInnerHTML={{__html: isRender || forceRender ? children : placeholder}}
        />
      )
    }
    return (
      <div
        style={props.style}
        role="tabpanel"
        aria-hidden={props.active ? 'false' : 'true'}
        className={cls}
      >
        {isRender || forceRender ? children : placeholder}
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
  innerHtml: PropTypes.bool,
}

TabPane.defaultProps = {
  placeholder: null,
  innerHtml:false
}
export default TabPane
