import variables from '~/styles/variables';

export const spacing = variables.spacing;

export type ISpacing = keyof typeof spacing;

export interface ISpacingProps {
  marginBottom?: ISpacing;
  marginHorizontal?: ISpacing;
  marginLeft?: ISpacing;
  marginRight?: ISpacing;
  marginTop?: ISpacing;
  marginVertical?: ISpacing;
  margin?: ISpacing;
  padding?: ISpacing;
  paddingBottom?: ISpacing;
  paddingHorizontal?: ISpacing;
  paddingLeft?: ISpacing;
  paddingRight?: ISpacing;
  paddingTop?: ISpacing;
  paddingVertical?: ISpacing;
}

export function spacingStyle(props: ISpacingProps, style: any = {}) {
  if (props.marginTop) {
    style.marginTop = variables.spacing[props.marginTop];
  }

  if (props.marginLeft) {
    style.marginLeft = variables.spacing[props.marginLeft];
  }

  if (props.marginRight) {
    style.marginRight = variables.spacing[props.marginRight];
  }

  if (props.marginBottom) {
    style.marginBottom = variables.spacing[props.marginBottom];
  }

  if (props.marginHorizontal) {
    style.marginHorizontal = variables.spacing[props.marginHorizontal];
  }

  if (props.marginVertical) {
    style.marginVertical = variables.spacing[props.marginVertical];
  }

  if (props.margin) {
    style.margin = variables.spacing[props.margin];
  }

  if (props.paddingTop) {
    style.paddingTop = variables.spacing[props.paddingTop];
  }

  if (props.paddingLeft) {
    style.paddingLeft = variables.spacing[props.paddingLeft];
  }

  if (props.paddingRight) {
    style.paddingRight = variables.spacing[props.paddingRight];
  }

  if (props.paddingBottom) {
    style.paddingBottom = variables.spacing[props.paddingBottom];
  }

  if (props.paddingHorizontal) {
    style.paddingHorizontal = variables.spacing[props.paddingHorizontal];
  }

  if (props.paddingVertical) {
    style.paddingVertical = variables.spacing[props.paddingVertical];
  }

  if (props.padding) {
    style.padding = variables.spacing[props.padding];
  }

  return style;
}
