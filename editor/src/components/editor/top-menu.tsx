import * as React from 'react'
import { MenuIcons, SimpleFlexRow, SquareButton, Tooltip } from '../../uuiui'
import { useEditorState } from './store/store-hook'
import * as EditorActions from '../editor/actions/action-creators'
import { betterReactMemo } from '../../uuiui-deps'
import * as TP from '../../core/shared/template-path'
import { FormulaBar } from '../canvas/controls/formula-bar'
import { getNavigatorPositionNextState } from './actions/actions'
import { LeftPaneDefaultWidth } from '../navigator/left-pane'
import CanvasActions from '../canvas/canvas-actions'
import { CanvasVector } from '../../core/shared/math-utils'
import { EditorAction } from './action-types'
import { ComponentOrInstanceIndicator } from '../editor/component-button'

export const TopMenu = betterReactMemo('TopMenu', () => {
  const dispatch = useEditorState((store) => store.dispatch, 'TopMenu dispatch')
  const navigatorPosition = useEditorState(
    (store) => store.editor.navigator.position,
    'TopMenu navigatorPosition',
  )
  const nextNavigatorPosition = useEditorState(
    (store) => getNavigatorPositionNextState(store.editor),
    'TopMenu nextNavigatorState',
  )

  const onClickNavigateTab = React.useCallback(() => {
    let actions: EditorAction[] = [EditorActions.togglePanel('navigatorPane')]
    if (
      nextNavigatorPosition === 'right' &&
      (navigatorPosition === 'hidden' || navigatorPosition === 'left')
    ) {
      actions.push(CanvasActions.scrollCanvas({ x: -LeftPaneDefaultWidth, y: 0 } as CanvasVector))
    } else if (
      (nextNavigatorPosition === 'hidden' || nextNavigatorPosition === 'left') &&
      navigatorPosition === 'right'
    ) {
      actions.push(CanvasActions.scrollCanvas({ x: LeftPaneDefaultWidth, y: 0 } as CanvasVector))
    }
    dispatch(actions)
  }, [dispatch, nextNavigatorPosition, navigatorPosition])

  const selectedViews = useEditorState(
    (store) => store.editor.selectedViews,
    'TopMenu selectedViews',
  )
  const formulaBarKey = selectedViews.map(TP.toString).join(',')

  return (
    <SimpleFlexRow style={{ flexGrow: 1, gap: 12, paddingLeft: 8, paddingRight: 8 }}>
      <Tooltip title={'Toggle outline'} placement={'bottom'}>
        <SquareButton
          spotlight={false}
          highlight={true}
          // selected={navigatorPosition !== 'hidden'}
          // highlightSelected={false}
          onClick={onClickNavigateTab}
        >
          <MenuIcons.Navigator />
        </SquareButton>
      </Tooltip>
      <ComponentOrInstanceIndicator />
      <FormulaBar key={formulaBarKey} />
    </SimpleFlexRow>
  )
})
