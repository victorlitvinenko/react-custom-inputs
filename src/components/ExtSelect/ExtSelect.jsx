import React, { useState, useEffect, useRef } from 'react';

import './style.scss';

const useFocus = () => {
  const htmlElRef = useRef(null);
  const setFocus = () => {
    if (htmlElRef.current) {
      htmlElRef.current.focus();
    }
  };
  return [htmlElRef, setFocus];
};

export const ExtOption = (props) => {
  const {
    active, handleClickItem, children,
  } = props;

  const classNames = `ext-select-items__item ${active ? 'active' : ''}`;

  return (
    <div
      role="button"
      tabIndex="0"
      onClick={handleClickItem}
      onKeyDown={(e) => (e.key === 'Enter' ? handleClickItem() : null)}
      className={classNames}
    >
      {children}
    </div>
  );
};

export const ExtSelect = (props) => {
  const {
    name, placeholder, selected, onChange, children,
  } = props;

  const [show, setShow] = useState(false);
  const [selectedId, setSelectedId] = useState(selected);
  const [filter, setFilter] = useState('');
  const [items, setItems] = useState([]);

  useEffect(() => {
    React.Children.map(children, (child, id) => {
      const { children: text, ...rest } = child.props;
      setItems((prevItems) => [...prevItems, { id, ...rest, text }]);
    });
  }, [children]);

  const [inputRef, setInputFocus] = useFocus();
  const node = useRef();

  const handleClickOutside = (e) => {
    if (node.current && node.current.contains(e.target)) {
      return;
    }
    setShow(false);
  };

  useEffect(() => {
    if (show) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [show]);

  useEffect(() => {
    setSelectedId(selected);
  }, [selected]);

  useEffect(setInputFocus);

  const toggleShow = () => {
    setShow(!show);
    setFilter('');
  };

  const handleClickItem = (target, id) => {
    setSelectedId(id);
    onChange(target, id);
    setShow(false);
    setFilter('');
  };

  const handleFilterChange = (e) => {
    const { value } = e.target;
    setFilter(value.trim());
  };

  const classes = `ext-select-selected ${show ? 'show' : ''}`;

  const renderItems = () => (
    <div className="ext-select-items" ref={node}>
      <div className="ext-select-items__search">
        <input ref={inputRef} type="text" onChange={handleFilterChange} tabIndex="0" />
      </div>
      {React.Children.map(children, (child, id) => (
        child.props.children.indexOf(filter) !== -1 && React.cloneElement(child, {
          active: id === selectedId, handleClickItem: () => handleClickItem(name, id),
        }, child.props.children)))}
    </div>
  );

  const renderCurrentItem = () => {
    const current = items.find((item) => item.id === selectedId);
    return current ? current.text : placeholder;
  };

  return (
    <div className="ext-select">
      <div
        role="button"
        tabIndex="0"
        className={classes}
        onMouseDown={() => toggleShow()}
        onKeyDown={(e) => (e.key === 'Enter' ? toggleShow() : null)}
      >
        {renderCurrentItem()}
      </div>
      {show && renderItems()}
    </div>
  );
};
