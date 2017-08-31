import React from 'react';
import {
    Step,
    Stepper,
    StepButton,
    StepContent,
} from 'material-ui/Stepper';

/**
 * A basic vertical non-linear implementation
 */
class VerticalNonLinear extends React.Component {

    state = {
        stepIndex: -1,
    };

    setp = [0,1,2,3,4,5];
    steps = this.setp.map((s) =>
        <Step key={s}>
            <StepButton onClick={() => this.setState({stepIndex: s})}>
                Descritivo fase
            </StepButton>
            <StepContent>
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Phasellus fringilla sagittis purus et feugiat. Sed finibus lorem nisi, eget vestibulum urna luctus eget.
                    Vivamus felis nisi, interdum a aliquam eu, tempus quis arcu. L
                    orem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus fringilla sagittis purus et feugiat.
                    Sed finibus lorem nisi, eget vestibulum urna luctus eget.
                    Vivamus felis nisi, interdum a aliquam eu, tempus quis arcu.
                </p>

            </StepContent>
        </Step>
    );

    render() {
        const {stepIndex} = this.state;

        return (
      <div>
          <h3 className="title">Confira a grade do curso</h3>
          <div style={{width: '100%', margin: 'auto'}}>
              <Stepper
                  activeStep={stepIndex}
                  linear={false}
                  orientation="vertical">
                  {this.steps}
              </Stepper>
          </div>
      </div>
        );
    }
}

export default VerticalNonLinear;