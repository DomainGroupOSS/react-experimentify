import Experiment from '../../src/experiment';
import Treatment from '../../src/treatment';

const shallow = enzyme.shallow;
const stub = sinon.stub;

let experiment;
let wrapper;
let children;

beforeEach(() => {
  experiment = stub({
    activate() {true},
    controlProps() {},
    hasVariant() {},
    isActive() {},
    isControl() {},
    pushEvent() {},
    subscribe() {},
    update() {},
    variantProps() {},
  });
  children = '<p>child</p>';
  wrapper = shallow(
    <Experiment {...experiment}>
      <Treatment {...children} />
    </Experiment>
  );
});

describe('treatment.js', () => {
  describe('<Treatment/>', () => {

    it('should render', () => {

      expect(wrapper).to.be.present();
    });

    it('should render children', () => {
      experiment.hasVariant.returns(true);

      expect(wrapper).to.have.prop('children');
    });

    it('should not render children if hasVariant returns false', () => {
      experiment.hasVariant.returns(false);
      const component = wrapper.find('Treatment');

      expect(component).to.not.have.prop('children');
    });
  });
});
