keyMirror = require('react/lib/keyMirror')

module.exports =

  ActionTypes: keyMirror
    GOOD_DATA_WRITER_LOAD_START: null
    GOOD_DATA_WRITER_LOAD_SUCCESS: null
    GOOD_DATA_WRITER_LOAD_ERROR: null

    GOOD_DATA_WRITER_LOAD_TABLE_START: null
    GOOD_DATA_WRITER_LOAD_TABLE_SUCCESS: null
    GOOD_DATA_WRITER_LOAD_TABLE_ERROR: null

    GOOD_DATA_WRITER_LOAD_REFERENCABLE_TABLES_START: null
    GOOD_DATA_WRITER_LOAD_REFERENCABLE_TABLES_SUCCESS: null
    GOOD_DATA_WRITER_LOAD_REFERENCABLE_TABLES_ERROR: null

    GOOD_DATA_WRITER_SAVE_TABLE_FIELD_START: null
    GOOD_DATA_WRITER_SAVE_TABLE_FIELD_SUCCESS: null
    GOOD_DATA_WRITER_SAVE_TABLE_FIELD_ERROR: null

    GOOD_DATA_WRITER_RESET_TABLE_START: null
    GOOD_DATA_WRITER_RESET_TABLE_SUCCESS: null
    GOOD_DATA_WRITER_RESET_TABLE_ERROR: null

    GOOD_DATA_WRITER_UPLOAD_START: null
    GOOD_DATA_WRITER_UPLOAD_SUCCESS: null
    GOOD_DATA_WRITER_UPLOAD_ERROR: null

    GOOD_DATA_WRITER_DELETE_START: null
    GOOD_DATA_WRITER_DELETE_SUCCESS: null
    GOOD_DATA_WRITER_DELETE_ERROR: null

    GOOD_DATA_WRITER_COLUMNS_EDIT_START: null
    GOOD_DATA_WRITER_COLUMNS_EDIT_CANCEL: null
    GOOD_DATA_WRITER_COLUMNS_EDIT_UPDATE: null

    GOOD_DATA_WRITER_TABLE_FIELD_EDIT_START: null
    GOOD_DATA_WRITER_TABLE_FIELD_EDIT_UPDATE: null
    GOOD_DATA_WRITER_TABLE_FIELD_EDIT_CANCEL: null

    GOOD_DATA_WRITER_COLUMNS_EDIT_SAVE_START: null
    GOOD_DATA_WRITER_COLUMNS_EDIT_SAVE_SUCCESS: null
    GOOD_DATA_WRITER_COLUMNS_EDIT_SAVE_ERROR: null


    GOOD_DATA_WRITER_LOAD_DATE_DIMENSIONS_START: null
    GOOD_DATA_WRITER_LOAD_DATE_DIMENSIONS_SUCCESS: null
    GOOD_DATA_WRITER_LOAD_DATE_DIMENSIONS_ERROR: null

    GOOD_DATA_WRITER_DATE_DIMENSION_DELETE_START: null
    GOOD_DATA_WRITER_DATE_DIMENSION_DELETE_SUCCESS: null
    GOOD_DATA_WRITER_DATE_DIMENSION_DELETE_ERROR: null

    GOOD_DATA_WRITER_NEW_DATE_DIMENSION_UPDATE: null

    GOOD_DATA_WRITER_NEW_DATE_DIMENSION_SAVE_START: null
    GOOD_DATA_WRITER_NEW_DATE_DIMENSION_SAVE_SUCCESS: null
    GOOD_DATA_WRITER_NEW_DATE_DIMENSION_SAVE_ERROR: null

  ColumnTypes: keyMirror
    ATTRIBUTE: null
    CONNECTION_POINT: null
    DATE: null
    FACT: null
    HYPERLINK: null
    IGNORE: null
    LABEL: null
    REFERENCE: null

  DataTypes: keyMirror
    BIGINT: null
    DATE: null
    DECIMAL: null
    INT: null
    VARCHAR: null

  SortOrderOptions: keyMirror
    ASC: null
    DESC: null
