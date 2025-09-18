import type React from 'react';
import './Page.css';

import { Content } from './Content';
import { Footer } from './Footer';
import { Header } from './Header';
import { Logo } from '../../logo/components/Logo';
import { ScrollProgress } from '../../scrollprogress/components/ScrollProgress';
import { ScrollTop } from '../../scrolltop/components/ScrollTop';
import { Loading } from '../../loading/components/Loading';
import { Meteors } from '../../../shared/components/aceternity/meteors';
import { NoiseOverlay } from '../../noiseoverlay/components/NoiseOverlay';
import { Settings } from '../../settings/components/Settings';
import { CursorEffect } from '../../cursoreffect/components/CursorEffect';
import { useSelector } from 'react-redux';
import type { StoreType } from '../../../shared/redux/store';

interface PageProperties {
    header?: boolean;
    content?: boolean;
    footer?: boolean;

    loading?: boolean;
    noiseOverlay?: boolean;
    meteors?: boolean;
    cursorEffect?: boolean;

    scrollTop?: boolean;
    scrollProgress?: boolean;
    logo?: boolean;
    settings?: boolean;
}

interface Props {
    className?: string;
    children?: React.ReactNode;

    properties?: PageProperties;
}

export const Page = ({ className = '', children, properties }: Props) => {
    const loaded = useSelector((state: StoreType) => state.loaded.value);

    return (
        <main className={`page ${className}`}>
            { (properties?.header ?? true) && <Header/> }
            
            {/* effects & processing */}
            { (properties?.loading ?? true) && <Loading/> } 
            { (properties?.noiseOverlay ?? true) && <NoiseOverlay delay={ loaded ? 0 : 5 }/> }
            { (properties?.meteors ?? true) && <Meteors/> }
            { (properties?.cursorEffect ?? true) && <CursorEffect/> }

            {/* fixed positioned elements */}
            { (properties?.scrollTop ?? true) && <ScrollTop/> }
            { (properties?.scrollProgress ?? true) && <ScrollProgress/> }
            { (properties?.logo ?? true) && <Logo/> }
            { (properties?.settings ?? true) && <Settings/> }

            { (properties?.content ?? true) && ( 
                <Content>
                    { children }
                </Content>
            )}
            
            { (properties?.footer ?? true) && <Footer/> }
        </main>
    )
}