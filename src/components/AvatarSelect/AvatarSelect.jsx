import React, { useState, useRef, useEffect } from 'react';

import './style.scss';

export const AvatarOption = (props) => {
  const {
    active, handleClickItem, avatar, children,
  } = props;

  const classNames = `avatar-select-items__item ${active ? 'active' : ''}`;

  return (
    <div
      role="button"
      tabIndex="0"
      onClick={handleClickItem}
      onKeyDown={(e) => (e.key === 'Enter' ? handleClickItem() : null)}
      className={classNames}
    >
      <img src={avatar} alt="" />
      <div>{children}</div>
    </div>
  );
};

export const AvatarSelect = (props) => {
  const {
    name, placeholder, selected, onChange, children,
  } = props;

  const [show, setShow] = useState(false);
  const [selectedId, setSelectedId] = useState(selected);

  const items = [];
  React.Children.map(children, (child, id) => {
    const { children: text, ...rest } = child.props;
    items.push({ id, ...rest, text });
  });

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

  useEffect(() => {
    items.forEach(({ avatar }) => {
      const img = new Image();
      img.src = avatar;
    });
  }, [items]);

  const handleClickItem = (target, id) => {
    setSelectedId(id);
    onChange(target, id);
    setShow(false);
  };

  const toggleShow = () => {
    setShow(!show);
  };

  const renderItems = () => (
    <div className="avatar-select-items">
      <div className="avatar-select-items__header">
        All users
      </div>
      {React.Children.map(children, (child, id) => (
        React.cloneElement(child, {
          active: id === selectedId, handleClickItem: () => handleClickItem(name, id),
        }, child.props.children)))}
    </div>
  );

  const renderCurrentItem = () => {
    const current = items.find((item) => item.id === selectedId);
    return current ? (
      <>
        <img src={current.avatar} alt="" />
        <div>{current.text}</div>
      </>
    ) : placeholder;
  };

  return (
    <div className="avatar-select" ref={node}>
      <div
        role="button"
        tabIndex="0"
        className="avatar-select-selected"
        onMouseDown={() => toggleShow()}
        onKeyDown={(e) => (e.key === 'Enter' ? toggleShow() : null)}
      >
        {renderCurrentItem()}
      </div>
      {show && renderItems()}
    </div>
  );
};
