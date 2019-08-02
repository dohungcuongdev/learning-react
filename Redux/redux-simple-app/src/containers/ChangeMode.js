import React, { useCallback, useMemo, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

function ChangeMode() {
    const dispatch = useDispatch();
    const setMode = useCallback(
        (mode) => dispatch({ type: 'SET_MODE', mode }),
        [dispatch]
    )
    const isOnlineMode = useSelector(state => state.isOnlineMode)
    const buttonChangeMode = useMemo(() => {
        if (isOnlineMode) {
            return (
                <div>
                    <p>ONLINE</p>
                    <button onClick={() => setMode('OFFLINE')}>{'Turn off online mode'}</button>
                </div>
            )
        }
        return (
            <div>
                <p>OFFLINE</p>
                <button onClick={() => setMode('ONLINE')}>{'Turn on online mode'}</button>
            </div>
        )
    }, [isOnlineMode, setMode]); // only if isOnlineMode changed then trigger

    useEffect(() => {
        // returned function will be called on component unmount 
        return () => {
            // componentWillUnmount
            setMode('OFFLINE');
        }
    }, [setMode])

    return (
        <div>
            <h3>Mode</h3>
            {buttonChangeMode}
        </div>
    );
}

export default ChangeMode