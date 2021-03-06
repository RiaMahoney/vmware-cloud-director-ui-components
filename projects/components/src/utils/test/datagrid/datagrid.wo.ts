/*!
 * Copyright 2019 VMware, Inc.
 * SPDX-License-Identifier: BSD-2-Clause
 */

import { GridSelectionType } from './../../../datagrid/datagrid.component';

import { DebugElement, Type } from '@angular/core';
import { By } from '@angular/platform-browser';
import { ClrDatagrid } from '@clr/angular';
import { DatagridFilter } from '../../../datagrid/filters/datagrid-filter';
import { ShowClippedTextDirective } from '../../../lib/directives/show-clipped-text.directive';
import { WidgetObject } from '../widget-object';

const ROW_TAG = 'clr-dg-row';
const CELL_TAG = 'clr-dg-cell';
const COLUMN_SELECTOR = 'clr-dg-column';
const COLUMN_CSS_SELECTOR = '.datagrid-column-title';
const FILTER_SELECTOR = 'clr-dg-filter';

/**
 * Widget Object for a Clarity DataGrid
 */
export class ClrDatagridWidgetObject extends WidgetObject<ClrDatagrid> {
    static tagName = `clr-datagrid`;

    /**
     * Retrieves the text content of a cell
     * @param row 0-based index of row
     * @param column 0-based index of column
     */
    getCellText(row: number, column: number): string {
        return this.getNodeText(this.getCell(row, column));
    }

    /**
     * Gives the text content of all the cells in a row.
     * @param rowIndex 0-based index of row
     */
    getRowValues(rowIndex: number): string[] {
        return this.getTexts(`${ROW_TAG}:nth-of-type(${rowIndex + 1}) ${CELL_TAG}`);
    }

    /**
     * Gives the linked text in the given cell represented by the {@param rowIndex} and {@param columnIndex} if present.
     */
    getCellLink(rowIndex: number, columnIndex: number): string[] {
        return this.getCell(rowIndex, columnIndex)
            .nativeElement.querySelector('a')
            .getAttribute('href');
    }

    /**
     * Retrieves if the cell will clip text
     * @param column 0-based index of column
     */
    columnClippedTextDirective(column: number): ShowClippedTextDirective {
        const res = this.getCell(0, column);
        return res.injector.get(ShowClippedTextDirective);
    }

    /**
     * Returns the number of visible columns
     */
    get columnCount(): number {
        return this.component.columns ? this.component.columns.length : this.columns.length;
    }

    /**
     * Returns the text for a header
     * @param columnIndex 0-based index of header to retrieve
     */
    getColumnHeader(columnIndex: number): string {
        return this.getText(`${COLUMN_CSS_SELECTOR}:nth-of-type(${columnIndex + 1})`);
    }

    /**
     * Returns an array of the texts for columns, in DOM order
     */
    get columnHeaders(): string[] {
        return this.getTexts(COLUMN_CSS_SELECTOR);
    }

    /**
     * Returns an array of the texts for columns that are hidden.
     */
    get hiddenColumnHeaders(): string[] {
        return this.getTexts('clr-dg-column.datagrid-hidden-column');
    }

    /**
     * Returns the number of rows currently displayed
     */
    get rowCount(): number {
        return this.rows.length;
    }

    /**
     * Says if this datagrid is loading.
     */
    get loading(): boolean {
        return this.component.loading;
    }

    /**
     * Gives the placeholder present on the datagrid.
     */
    get placeholder(): string {
        return this.getText('clr-dg-placeholder');
    }

    /**
     * Returns whether or not the column with the given index is displayed by the CSS.
     */
    isColumnDisplayed(index: number): boolean {
        return this.findElements(COLUMN_SELECTOR)[index].classes['datagrid-hidden-column'] !== true;
    }

    /**
     * Returns the classes of the column with the given index.
     */
    getColumnClasses(index: number): string[] {
        return Object.keys(this.findElements(COLUMN_SELECTOR)[index].classes);
    }

    /*
     * Returns the CSS class of the Clarity datagrid.
     */
    get gridCssClass(): string[] {
        return Object.keys(this.root.classes);
    }

    /**
     * Returns the CSS class names of the given Clarity datarow.
     */
    getRowsCssClass(index: number): string[] {
        return Object.keys(this.rows[index].classes);
    }

    /**
     * Returns the native element contents within all the detail pane open.
     */
    getAllDetailRowContents(): string[] {
        return this.findElements('clr-dg-row-detail').map(detail => detail.nativeElement);
    }

    /**
     * Returns the native element contents within all the detail pane open.
     */
    getAllDetailPaneContents(): string[] {
        return this.findElements('.datagrid-detail-pane-content').map(detail => detail.nativeElement);
    }

    /**
     * Returns the header of the detail pane.
     */
    getDetailPaneHeader(): string {
        return this.getText('.datagrid-detail-header-title');
    }

    /**
     * Clicks the given detail row button.
     */
    clickDetailRowButton(row: number): void {
        this.detailRowButtons[row].nativeElement.click();
    }

    /**
     * Clicks the given detail pane button.
     */
    clickDetailPaneButton(row: number): void {
        this.detailPaneButtons[row].nativeElement.click();
    }

    /**
     * Sorts the column at the given index.
     */
    sortColumn(index: number): void {
        this.columns[index].nativeElement.click();
    }

    /**
     * Returns the selection type of the grid.
     */
    getSelectionType(): GridSelectionType {
        if (this.findElements('clr-checkbox-wrapper').length !== 0) {
            return GridSelectionType.Multi;
        } else if (this.findElements('clr-radio-wrapper').length !== 0) {
            return GridSelectionType.Single;
        } else {
            return GridSelectionType.None;
        }
    }

    /**
     * Clicks the selection icon on the given row.
     */
    selectRow(row: number): void {
        this.click(`input`, this.rows[row]);
    }

    /**
     * Gives the pagination description text.
     */
    getPaginationDescription(): string {
        return this.findElement('.pagination-description').nativeElement.textContent;
    }

    /**
     * Gives the text next to the pagination selector.
     * Gives empty string if the size dropdown is not in the page.
     */
    getPaginationSizeSelectorText(): string {
        const sizer = this.findElement('clr-dg-page-size');
        return sizer ? sizer.nativeElement.textContent : '';
    }

    /**
     * Clicks the next page button.
     */
    nextPage(): void {
        this.click('.pagination-next');
    }

    /**
     * Gives a list of the labels of the displayed action buttons at the top of the grid.
     */
    getTopPositionedButtons(): string[] {
        return this.findElements('clr-dg-action-bar button').map(button => button.nativeElement.textContent);
    }

    /**
     * Gives the class of the cell that holds the row buttons.
     */
    getRowButtonContainerClass(rowIndex: number): string[] {
        return Object.keys(this.findElement(`.action-button-cell`, this.rows[rowIndex]).classes);
    }

    /**
     * Gives the text of the button with the given buttonClass on the top of the datagrid.
     */
    getTopButtonText(buttonClass: string): string {
        return this.getText(`button.${buttonClass}`);
    }

    /**
     * Gives the text of the button with the given buttonClass at a row of the datagrid.
     * @param row 0-based index of row
     */
    getRowButtonText(buttonClass: string, row: number): string {
        return this.getText(`button.${buttonClass}`, this.rows[row]);
    }

    /**
     * Says if the button on the top of the grid with the given buttonClass is enabled.
     */
    isTopButtonEnabled(buttonClass: string): boolean {
        return !this.findElement(`button.${buttonClass}`).nativeElement.disabled;
    }

    /**
     * Says if the button at a row in the datagrid with the given buttonClass is enabled.
     * @param row 0-based index of row
     */
    isRowButtonEnabled(buttonClass: string, row: number): boolean {
        return !this.findElement(`button.${buttonClass}`, this.rows[row]).nativeElement.disabled;
    }

    /**
     * Presses the button with the given buttonClass on the top of the datagrid.
     */
    pressTopButton(buttonClass: string): void {
        this.click(`button.${buttonClass}`);
    }

    /**
     * Presses the button with the given buttonClass on a row of the datagrid.
     * @param row 0-based index of row
     */
    pressRowButton(buttonClass: string, row: number): void {
        this.click(`button.${buttonClass}`, this.rows[row]);
    }

    /**
     * Gives the height CSS of this clr-datagrid.
     */
    get gridHeight(): string {
        return this.root.parent.nativeElement.style.getPropertyValue('--datagrid-height');
    }

    /**
     * Gives the height of the grids container.
     */
    get gridContainerClasses(): string[] {
        return Object.keys(this.root.parent.classes);
    }

    /**
     * Can be used by subclasses to create methods that assert about HTML in custom rendered columns. Note that
     * subclasses should not return the DebugElement, they should return a string from a section of the HTML.
     *
     * @param row 0-based index of row
     * @param column 0-based index of column
     *
     * Because the custom renderer widget object requires getting the {@link DebugElement} of a cell,
     * but doesn't directly extend {@link ClrDatagridWidgetObject}, this method needs to be public.
     * This will be fixed in {@link https://jira.eng.vmware.com/browse/VDUCC-127}.
     */
    getCell(row: number, column: number): DebugElement {
        return this.findElement(`${ROW_TAG}:nth-of-type(${row + 1}) ${CELL_TAG}:nth-of-type(${column + 1})`);
    }

    private get rows(): DebugElement[] {
        return this.findElements(ROW_TAG);
    }

    private get columns(): DebugElement[] {
        return this.findElements(COLUMN_CSS_SELECTOR);
    }

    private get detailRowButtons(): DebugElement[] {
        return this.findElements('.datagrid-expandable-caret-button');
    }

    private get detailPaneButtons(): DebugElement[] {
        return this.findElements('.datagrid-detail-caret-button');
    }

    private openFilter(): void {
        const clrDgColumn = this.findElements(COLUMN_SELECTOR)[0];
        const filterDebugEl = this.findElement(FILTER_SELECTOR, clrDgColumn);
        this.click('.datagrid-filter-toggle', filterDebugEl);
        this.detectChanges();
    }

    /**
     * Used by the {@link createDatagridFilterTestHelper} to query for a filter component. Opens filter of first
     * column and returns the filter component.
     * @param ctor The constructor of a grid filter component
     */
    getFilter<V, C>(ctor: Type<DatagridFilter<V, C>>): DatagridFilter<V, C> {
        this.openFilter();
        return this.root.parent.parent.parent.query(By.directive(ctor)).componentInstance;
    }
}
