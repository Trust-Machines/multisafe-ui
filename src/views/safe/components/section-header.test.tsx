import SectionHeader from './section-header';
import {renderWithRouter} from '../../../helper/test-helper';
import TollIcon from '@mui/icons-material/Toll';

test('1 Default Render', () => {
    const rendered = renderWithRouter(<SectionHeader title="Coins" icon={<TollIcon/>}/>);
    expect(rendered.container).toMatchSnapshot()
});

test('2 Render with children', () => {
    const rendered = renderWithRouter(<SectionHeader title="Coins" icon={
        <TollIcon/>}><span>lorem ipsum dolor sit amet</span></SectionHeader>);
    expect(rendered.container).toMatchSnapshot()
});

