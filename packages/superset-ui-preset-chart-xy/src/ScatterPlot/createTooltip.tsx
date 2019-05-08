/* eslint-disable no-magic-numbers */

import React from 'react';
import TooltipFrame from '../components/tooltip/TooltipFrame';
import TooltipTable from '../components/tooltip/TooltipTable';
import Encoder from './Encoder';
import { isFieldDef } from '../encodeable/types/ChannelDef';
import { EncodedPoint } from './ScatterPlot';

export default function createTooltip(encoder: Encoder) {
  function Tooltip({ datum }: { datum: EncodedPoint }) {
    const { channels } = encoder;
    const { x, y, size, fill, stroke } = channels;

    const tooltipRows = [
      { key: 'x', keyColumn: x.getTitle(), valueColumn: x.format(datum.data) },
      { key: 'y', keyColumn: y.getTitle(), valueColumn: y.format(datum.data) },
    ];

    if (isFieldDef(fill.definition)) {
      tooltipRows.push({
        key: 'fill',
        keyColumn: fill.getTitle(),
        valueColumn: fill.format(datum.data),
      });
    }
    if (isFieldDef(stroke.definition)) {
      tooltipRows.push({
        key: 'stroke',
        keyColumn: stroke.getTitle(),
        valueColumn: stroke.format(datum.data),
      });
    }
    if (isFieldDef(size.definition)) {
      tooltipRows.push({
        key: 'size',
        keyColumn: size.getTitle(),
        valueColumn: size.format(datum.data),
      });
    }

    return (
      <TooltipFrame>
        <TooltipTable data={tooltipRows} />
      </TooltipFrame>
    );
  }

  return Tooltip;
}