[PRODUCTS, QUOTES AND SERVICES]



* measurement_unit 
  * id
    * type: primary_key, UUID
  * unit
    * VARCHAR(20)
    * optional: false
    * note: mm, m, etc
* technical_attribute
  * id
    * type: primary_key, UUID
  * name 
    * type: TEXT
    * note: side, thickness, etc
    * optional: false
  * var
    * type: VARCHAR(20)
    * optional: false
    * note: W, H, T, etc
  * unit <virtual, fk: measurement_unit_id>
    * relation:: <has_one measurement_unit>
    * optional: false
  * selection_values
    * type: ARRAY[VARCHAR(20)]
    * optional: true
    * default: []
* calculator_formula 
  * id
    * type: primary_key, UUID
  * name
    * type: TEXT
    * optional: false
  * description
    * type: TEXT
    * optional: true
    * default: null
  * calculates
    * type: TEXT
    * optional: false
    * note: the technical_attribute→var of any product→attributes associated to the product asociated with this product→formula 
  * formula 
    * type: TEXT
    * optional: false
    * note: regex of form (ex) ${} compatible with math-expression-evaluator, where each ${...} is a technical_attribute→var - should be validated before write
* product
  * id
    * type: primary_key, UUID
  * description
    * type: TEXT
    * optional: true
    * default: null
  * formula <virtual, fk: calculator_formula_id>
    * relation: <has_one: calculator_formula>
    * optional: true
    * default: null
  * material <virtual, fk: material_id>
    * relation: <has_one: material>
    * optional: false
  * images <virtual>
    * relation: <has_many: asset>
    * optional: true
    * default: []
  * attributes <virtual>
    * relation: <has_many: technical_attribute>
    * optional: false
  * services <virtual>
    * relation: <has_mane: service>
    * optional: true
    * default: []
* material
  * id
    * type: primary_key, UUID
  * name
    * type: TEXT
    * optional: false
  * attributes <virtual>
    * relation: <has_many: technical_attribute>
    * optional: false
* quote
  * id
    * type: primary_key, UUID
  * client <virtual, fk: client_id>
    * relation: <has_one: client>
    * optional: false
  * agent <virtual, fk: agent_id>
    * relation: <has_one: agent>
    * default: null
    * optional: true
  * technical_assets <virtual>
    * relation: <has_many: quote_asset>
    * optional: false
  * type <virutal, fk: quote_type_id>
    * relation: <has_one: quote_type>
    * optiona: false
  * invoice <virtual, fk: asset_id>
    * relation: <has_one: asset>
    * default: null
    * optional: true
  * quotee_input <virtual, fk: quotee_input_id>
    * relation: <has_one: quotee_input>
    * optional: false
  * products <virtual>
    * relation: <has_many: product>
  * images <virtual>
    * relation: <has_many: asset>
  * technical_documents <virtual>
    * relation <has_many: 
  * for <virtual, fk: customer_id>
    * relation: <has_one customer>
    * optional: true
    * default: null
  * status
    * type: enum [draft, analysis, offer, accepted (or: <offer, modified, accepted>) pending, delivered] 
    * default: draft
    * optional: true
  * quotee_selected_services <virtual>
    * relation: <has_many quotee_product_service>
    * optional: true
    * default: []
  * quote_product_input_values <virtual>
    * relation: <has_many quote_product_attribute_quotee>
    * optional: true
    * default: []
  * requests <virtual>
    * relation: <has_many: request_message>
    * optional: true
    * default: []
  * chat_room_id
    * type: TEXT
    * optional: true
    * default: null
* request_message
  * id
    * type: primary_key, UUID
  * message
    * type: TEXT
    * optional: false
  * satisfied
    * type: BOOLEAN
    * optional: true
    * default: false
* quotee_input
  * id
    * type: primary_key, UUID
  * comment
    * type: TEXT
    * optional: true
    * default: null
  * quotee_internal_reference
    * type: TEXT
    * optional: true
    * default: null
* asset
  * id
    * type: primary_key, UUID
  * type
    * type: enum [product_image, quote_documentation, invoice]
    * optional: false
  * asset_url
    * type: TEXT
    * optional: false
* service
  * id
    * type: primary_key, UUID
  * name
    * type: TEXT
    * optional: false
* quote_type
  * id
    * type: primary_key, UUID
  * name
    * type: TEXT
    * optional: false

[USERS, AUTH, AUTHZ]



* user
  * id
    * type: primary_key, UUID
  * roles <virtual>
    * relation: <has_many role>
    * optional: false
  * profile <virtual, fk: profile_id>
    * relation <has_one profile>
    * optional: false
  * customers <virtual>
    * relation: <has_many customer>
    * optional: true
    * default: []
  * banned
    * type: BOOLEAN
    * optional: true
    * default: false
* profile
  * first_name
    * type: TEXT
    * optional: false
  * last_name
    * type: TEXT
    * optional: false
  * email
    * type: TEXT
    * optional: false
  * phone_number
    * type: TEXT
    * optional: false
  * address_one
    * type: TEXT
    * optional: false
  * address_two
    * type: TEXT
    * optional: true
    * default: null
  * postal_code
    * type: TEXT
    * optional: false
  * entity_type <virtual, fk: entity_type_id>
    * relation: <has_one entity_type>
    * optional: false
  * country <virtual, fk: country_id>
    * relation: <has_one: country>
    * optional: false
* role
  * id
    * type: primary_key, UUID
  * name
    * type: TEXT
    * optional: false
* customer
  * id
    * type: primary_key, UUID
  * description
    * type: TEXT
    * optional: true
    * default: null
* entity_type
  * id
    * type: primary_key, UUID
  * name
    * type: TEXT
    * optional: false
* country
  * id
    * type: primary_key, UUID
  * name
    * type: TEXT
    * optional: false
  * regions <virtual>
    * relation: <has_many region>
    * optional: false
* region
  * id
    * type: primary_key, UUID
  * name
    * type: TEXT
    * optional: false
  * country <virtual, fk: country_id>
    * relation: <has_one: country>
    * optional: false



Join tables



[PRODUCTS, QUOTES AND SERVICES]



* product_quote <declared>
  * id
    * type: primary_key, UUID
  * product <virtual, fk: produt_id>
    * relation: <has_one: product>
    * optional: false
  * quote <virtual, fk: quote_id>
    * relation: <has_one: quote>
    * optional: false
  * quantity
  * comment
* technical_attribute_product <declared>
  * id
  * insertable_for_quotation
    * type: boolean
    * optional: false
    * default: false
    * note
  * product <virtual, fk: product_id>
    * relation: <has_one: product>
    * optional: false
  * attribute <virtual, fk: technical_attribute_id>
    * relation: <has_one: technical_attribute>
    * optional: false
* technical_attribute_material <auto>
  * id
  * <material>
  * <technical_attribute>
* product_asset <auto>
  * id
  * <asset>
  * <product>
* quote_asset <auto>
  * id
  * <asset>
  * <quote>
* product_service <auto>
  * id
  * <product>
  * <service>
* quotee_product_service <declared>
  * id
  * product <virtual>
    * relation: <has_one: product>
    * optional: false
  * quote <virtual>
    * relation: <has_one: quote>
    * optional: false
  * service <virtual>
    * relation: <has_one: service>
    * optional: false
* quote_product_attribute_quotee <declared>
  * id
  * quote <virtual>
    * relation: <has_one: quote>
    * optional: false
  * product <virtual>
    * relation: <has_one: product>
    * optional: false
  * quotee_product_input
    * type: JSON
    * optional: true
    * note: the JSON will be constructed with fields based on the product→attributes with technical_attribute_product→insertable_for_quotation = true



[USERS, AUTH, AUTHZ]



* user_role <auto>
  * id
  * <user>
  * <role>
* user_customer <auto>
  * id
  * <user>
  * <customer>