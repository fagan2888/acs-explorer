import React from 'react';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import StateMap from './StateMap';
import ComparisonTable from './ComparisonTable';

Enzyme.configure({ adapter: new Adapter() });
jest.mock('mapbox-gl/dist/mapbox-gl', () => ({
    Map: () => ({})
}));

describe('StateMap', () => {
    let props;
    let mountedStateMap;
    const stateMap = () => {
        if (!mountedStateMap) {
            mountedStateMap = mount(
                <StateMap {...props} />
            );
        }
        return mountedStateMap;
    }

    beforeEach(() => {
        props = {
            acsData: [],
            acsVars: {},
            selectedAcsVar: '',
        };
        mountedStateMap = undefined
    });

    it('always renders a map-container div', () => {
        const divs = stateMap().find('div');
        expect(divs.length).toBeGreaterThan(0);
    });

    describe('the rendered container', () => {
        it ('contains the map, legend, and table', () => {
           const container = stateMap().first('div');
           expect(container.children()).toEqual(stateMap().children());
        });
    });

    it('awalys renders a map', () => {
        expect(stateMap().find('#map').length).toBe(1);
    });
    
    it('always renders a legend', () => {
        expect(stateMap().find('#legend').length).toBe(1);
    });

    it('always renders a ComparisonTable component', () => {
        expect(stateMap().find('#comparison-table').length).toBe(1);
    });

    describe('rendered ComparisonTable', () => {
        it('receives 3 props', () => {
            const comparisonTable = stateMap().find(ComparisonTable);
            expect(Object.keys(comparisonTable.props()).length).toBe(3);
        });
    });
});