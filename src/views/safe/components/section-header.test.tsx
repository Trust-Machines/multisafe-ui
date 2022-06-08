import SectionHeader from './section-header';
import {renderWithRouter} from '../../../helper/test-helper';
import TollIcon from '@mui/icons-material/Toll';

test('1 Default Render', () => {
    const view = renderWithRouter(<SectionHeader title="Coins" icon={<TollIcon/>}/>);
    expect(view.container).toMatchSnapshot()
});

test('2 Render with children', () => {
    const view = renderWithRouter(<SectionHeader title="Coins" icon={
        <TollIcon/>}><span>lorem ipsum dolor sit amet</span></SectionHeader>);
    expect(view.container).toMatchSnapshot()
});

