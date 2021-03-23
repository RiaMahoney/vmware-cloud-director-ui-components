/*
 * Copyright 2020 VMware, Inc. All rights reserved. VMware Confidential
 */

// import { FormInputWidget } from '../../../../../../cypress/support/widgets/form-input.widget';

import { BaseWidgetObject } from '../utils/test/widget-object/widget-object';
import { QuickSearchDataUi } from './quick-search.dataui';

export const QUICK_SEARCH_INPUT_CONTAINER = '.search-input-container';
const QUICK_SEARCH_RESULT_CONTAINER = '.search-result-container';
const QUICK_SEARCH_RESULT_SECTION = '.search-result-section';
const QUICK_SEARCH_RESULT_SECTION_TITLE = '.search-result-section-title';
const QUICK_SEARCH_RESULT_INDEX = '.section-index-';
const QUICK_SEARCH_RESULT_ITEM = '.search-result-item';
const QUICK_SEARCH_CURRENT_RESULT = '.selected';

const QUICK_SEARCH_RESULT_NOT_FOUND = -1;

export class QuickSearchWo<T> extends BaseWidgetObject<T> {
    static tagName = 'vcd-quick-search';

    getModalBody = this.factory.dataUi(QuickSearchDataUi.quickSearchModal);

    getInput = this.factory.dataUi(QuickSearchDataUi.searchInputContainer);

    getSearchResultContainer = this.factory.dataUi(QuickSearchDataUi.searchResultContainer);

    getSearchResultSection = this.factory.dataUi(QuickSearchDataUi.searchResultSection);

    getSearchResultSectionTitle = this.factory.dataUi(QuickSearchDataUi.searchResultSectionTitle);

    getSearchResultIndex = this.factory.dataUi(QuickSearchDataUi.searchResultSectionIndex);

    getSearchResultItem = this.factory.dataUi(QuickSearchDataUi.searchResultItem);

    getSelectSearchResultItem = this.factory.dataUi(QuickSearchDataUi.selectCurrentResult);

    getResultNotFound = this.factory.dataUi(QuickSearchDataUi.searchResultNotFound);
}
