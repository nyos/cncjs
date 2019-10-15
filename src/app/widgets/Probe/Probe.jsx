import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Button, ButtonGroup } from 'app/components/Buttons';
import FontAwesomeIcon from 'app/components/FontAwesomeIcon';
import Input from 'app/components/FormControl/Input';
import FormGroup from 'app/components/FormGroup';
import { Container, Row, Col } from 'app/components/GridSystem';
import Hoverable from 'app/components/Hoverable';
import InputGroup from 'app/components/InputGroup';
import Label from 'app/components/Label';
import Margin from 'app/components/Margin';
import Space from 'app/components/Space';
import Infotip from 'app/components/Infotip';
import i18n from 'app/lib/i18n';
import {
    METRIC_UNITS,
} from 'app/constants';
import {
    MODAL_PREVIEW
} from './constants';

const mapProbeCommandToDescription = (probeCommand) => ({
    'G38.2': i18n._('G38.2 probe toward workpiece, stop on contact, signal error if failure'),
    'G38.3': i18n._('G38.3 probe toward workpiece, stop on contact'),
    'G38.4': i18n._('G38.4 probe away from workpiece, stop on loss of contact, signal error if failure'),
    'G38.5': i18n._('G38.5 probe away from workpiece, stop on loss of contact'),
}[probeCommand] || '');

class Probe extends Component {
    static propTypes = {
        state: PropTypes.object,
        actions: PropTypes.object
    };

    render() {
        const { state, actions } = this.props;
        const {
            canClick,
            units,
            probeAxis,
            probeCommand,
            probeDepth,
            probeFeedrate,
            touchPlateHeight,
            retractionDistance
        } = state;
        const displayUnits = (units === METRIC_UNITS) ? i18n._('mm') : i18n._('in');
        const feedrateUnits = (units === METRIC_UNITS) ? i18n._('mm/min') : i18n._('in/min');
        const step = (units === METRIC_UNITS) ? 1 : 0.1;

        return (
            <Container fluid>
                <FormGroup>
                    <Margin bottom={4}>
                        <div>
                            <Label>{i18n._('Probe Axis')}</Label>
                        </div>
                        <ButtonGroup
                            sm
                            style={{
                                minWidth: '50%',
                            }}
                        >
                            <Button
                                btnStyle={probeAxis === 'Z' ? 'dark' : 'default'}
                                title={i18n._('Probe Z axis')}
                                onClick={() => actions.changeProbeAxis('Z')}
                            >
                                Z
                            </Button>
                            <Button
                                btnStyle={probeAxis === 'X' ? 'dark' : 'default'}
                                title={i18n._('Probe X axis')}
                                onClick={() => actions.changeProbeAxis('X')}
                            >
                                X
                            </Button>
                            <Button
                                btnStyle={probeAxis === 'Y' ? 'dark' : 'default'}
                                title={i18n._('Probe Y axis')}
                                onClick={() => actions.changeProbeAxis('Y')}
                            >
                                Y
                            </Button>
                        </ButtonGroup>
                    </Margin>
                </FormGroup>
                <FormGroup>
                    <Margin bottom={4}>
                        <div>
                            <Label>{i18n._('Probe Command: {{probeCommand}}', { probeCommand })}</Label>
                            <Space width={8} />
                            <Infotip content={mapProbeCommandToDescription(probeCommand)}>
                                <Hoverable>
                                    {({ hovered }) => (
                                        <span
                                            className="fa-layers fa-fw"
                                            style={{
                                                color: '#222',
                                                opacity: hovered ? 1 : 0.5,
                                            }}
                                        >
                                            <FontAwesomeIcon icon={['far', 'circle']} />
                                            <FontAwesomeIcon icon="info" transform="shrink-8" />
                                        </span>
                                    )}
                                </Hoverable>
                            </Infotip>
                        </div>
                        <ButtonGroup
                            sm
                            style={{
                                minWidth: '80%',
                            }}
                        >
                            <Button
                                btnStyle={probeCommand === 'G38.2' ? 'dark' : 'default'}
                                title={mapProbeCommandToDescription('G38.2')}
                                onClick={() => actions.changeProbeCommand('G38.2')}
                            >
                                G38.2
                            </Button>
                            <Button
                                btnStyle={probeCommand === 'G38.3' ? 'dark' : 'default'}
                                title={mapProbeCommandToDescription('G38.3')}
                                onClick={() => actions.changeProbeCommand('G38.3')}
                            >
                                G38.3
                            </Button>
                            <Button
                                btnStyle={probeCommand === 'G38.4' ? 'dark' : 'default'}
                                title={mapProbeCommandToDescription('G38.4')}
                                onClick={() => actions.changeProbeCommand('G38.4')}
                            >
                                G38.4
                            </Button>
                            <Button
                                btnStyle={probeCommand === 'G38.5' ? 'dark' : 'default'}
                                title={mapProbeCommandToDescription('G38.5')}
                                onClick={() => actions.changeProbeCommand('G38.5')}
                            >
                                G38.5
                            </Button>
                        </ButtonGroup>
                    </Margin>
                </FormGroup>
                <Row>
                    <Col width="auto">
                        <FormGroup>
                            <Label>{i18n._('Probe Depth')}</Label>
                            <InputGroup sm>
                                <Input
                                    type="number"
                                    value={probeDepth}
                                    placeholder="0.00"
                                    min={0}
                                    step={step}
                                    onChange={actions.handleProbeDepthChange}
                                />
                                <InputGroup.Append>
                                    <InputGroup.Text>
                                        {displayUnits}
                                    </InputGroup.Text>
                                </InputGroup.Append>
                            </InputGroup>
                        </FormGroup>
                    </Col>
                </Row>
                <Row>
                    <Col width="auto">
                        <FormGroup>
                            <Label>{i18n._('Probe Feedrate')}</Label>
                            <InputGroup sm>
                                <Input
                                    type="number"
                                    value={probeFeedrate}
                                    placeholder="0.00"
                                    min={0}
                                    step={step}
                                    onChange={actions.handleProbeFeedrateChange}
                                />
                                <InputGroup.Append>
                                    <InputGroup.Text>
                                        {feedrateUnits}
                                    </InputGroup.Text>
                                </InputGroup.Append>
                            </InputGroup>
                        </FormGroup>
                    </Col>
                </Row>
                <Row>
                    <Col width="auto">
                        <FormGroup>
                            <Label>{i18n._('Touch Plate Thickness')}</Label>
                            <InputGroup sm>
                                <Input
                                    type="number"
                                    value={touchPlateHeight}
                                    placeholder="0.00"
                                    min={0}
                                    step={step}
                                    onChange={actions.handleTouchPlateHeightChange}
                                />
                                <InputGroup.Append>
                                    <InputGroup.Text>
                                        {displayUnits}
                                    </InputGroup.Text>
                                </InputGroup.Append>
                            </InputGroup>
                        </FormGroup>
                    </Col>
                </Row>
                <Row>
                    <Col width="auto">
                        <FormGroup>
                            <Label>{i18n._('Retraction Distance')}</Label>
                            <InputGroup sm>
                                <Input
                                    type="number"
                                    value={retractionDistance}
                                    placeholder="0.00"
                                    min={0}
                                    step={step}
                                    onChange={actions.handleRetractionDistanceChange}
                                />
                                <InputGroup.Append>
                                    <InputGroup.Text>
                                        {displayUnits}
                                    </InputGroup.Text>
                                </InputGroup.Append>
                            </InputGroup>
                        </FormGroup>
                    </Col>
                </Row>
                <Margin bottom={8}>
                    <Button
                        md
                        btnStyle="secondary"
                        disabled={!canClick}
                        onClick={() => {
                            actions.openModal(MODAL_PREVIEW);
                        }}
                        style={{
                            minWidth: 'calc(100% / 3)',
                        }}
                    >
                        {i18n._('Probe Axis {{axis}}', { axis: probeAxis })}
                    </Button>
                </Margin>
            </Container>
        );
    }
}

export default Probe;
