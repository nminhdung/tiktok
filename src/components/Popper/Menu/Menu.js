import Tippy from '@tippyjs/react/headless';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import styles from './Menu.module.scss';
import { Wrapper as PopperWrapper } from '~/components/Popper';
import MenuItem from './MenuItem';
import Header from './Header';
import { useState } from 'react';
const cx = classNames.bind(styles);

const defaultFunction = () => {};

function Menu({ menuItems = [], children, onChange = defaultFunction, hideOnClick = false }) {
    const [history, setHistory] = useState([{ data: menuItems }]);
    const currentMenu = history[history.length - 1];

    const renderItem = () => {
        return currentMenu.data.map((item, index) => {
            const isParent = !!item.children;
            return (
                <MenuItem
                    key={index}
                    data={item}
                    onClick={() => {
                        if (isParent) {
                            setHistory((prev) => [...prev, item.children]);
                        } else {
                            onChange(item);
                        }
                    }}
                />
            );
        });
    };
    const handleBack = () => {
        setHistory((prev) => prev.slice(0, prev.length - 1));
    };
    const renderResult = (attrs) => (
        <div className={cx('menu-list')} tabIndex="-1" {...attrs}>
            <PopperWrapper className={cx('menu-popper')}>
                {history.length > 1 && <Header title={currentMenu.title} onBack={handleBack} />}
                <div className={cx('menu-body')}> {renderItem()}</div>
            </PopperWrapper>
        </div>
    );
    // Reset to first menu
    const handleResetMenu = () => {
        setHistory((prev) => prev.slice(0, 1));
    };
    return (
        <Tippy
            interactive
            placement="bottom-end"
            offset={[12, 8]}
            delay={[0, 700]}
            hideOnClick={hideOnClick}
            render={renderResult}
            onHide={handleResetMenu}
        >
            {children}
        </Tippy>
    );
}

Menu.propTypes = {
    menuItems: PropTypes.array,
    children: PropTypes.node.isRequired,
    onChange: PropTypes.func,
    hideOnClick: PropTypes.bool,
};

export default Menu;
