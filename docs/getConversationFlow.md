# Get Conversation Flow

> Retrieve details of a specific Conversation Flow

## OpenAPI

````yaml openapi-final get /get-conversation-flow/{conversation_flow_id}
paths:
  path: /get-conversation-flow/{conversation_flow_id}
  method: get
  servers:
    - url: https://api.retellai.com
      description: The production server.
  request:
    security:
      - title: api key
        parameters:
          query: {}
          header:
            Authorization:
              type: http
              scheme: bearer
              description: >-
                Authentication header containing API key (find it in dashboard).
                The format is "Bearer YOUR_API_KEY"
          cookie: {}
    parameters:
      path:
        conversation_flow_id:
          schema:
            - type: string
              required: true
              description: Unique id of the conversation flow to be retrieved.
      query:
        version:
          schema:
            - type: string
      header: {}
      cookie: {}
    body: {}
    codeSamples:
      - lang: JavaScript
        source: >-
          import Retell from 'retell-sdk';


          const client = new Retell({
            apiKey: 'YOUR_RETELL_API_KEY',
          });


          const conversationFlowResponse = await
          client.conversationFlow.retrieve('conversation_flow_id');


          console.log(conversationFlowResponse.conversation_flow_id);
      - lang: Python
        source: |-
          from retell import Retell

          client = Retell(
              api_key="YOUR_RETELL_API_KEY",
          )
          conversation_flow_response = client.conversation_flow.retrieve(
              conversation_flow_id="conversation_flow_id",
          )
          print(conversation_flow_response.conversation_flow_id)
  response:
    '200':
      application/json:
        schemaArray:
          - type: object
            properties:
              conversation_flow_id:
                allOf:
                  - type: string
                    description: Unique identifier for the conversation flow
              version:
                allOf:
                  - type: integer
                    description: Version number of the conversation flow
              model_choice:
                allOf:
                  - $ref: '#/components/schemas/ModelChoice'
                    description: The model choice for the conversation flow.
              model_temperature:
                allOf:
                  - type: number
                    minimum: 0
                    maximum: 1
                    example: 0.7
                    description: >-
                      Controls the randomness of the model's responses. Lower
                      values make responses more deterministic.
                    nullable: true
              tool_call_strict_mode:
                allOf:
                  - type: boolean
                    example: true
                    description: >-
                      Whether to use strict mode for tool calls. Only applicable
                      when using certain supported models.
                    nullable: true
              knowledge_base_ids:
                allOf:
                  - type: array
                    items:
                      type: string
                    example:
                      - kb_001
                      - kb_002
                    description: >-
                      Knowledge base IDs for RAG (Retrieval-Augmented
                      Generation).
                    nullable: true
              kb_config:
                allOf:
                  - type: object
                    $ref: '#/components/schemas/KBConfig'
                    description: Knowledge base configuration for RAG retrieval.
              start_speaker:
                allOf:
                  - type: string
                    enum:
                      - user
                      - agent
                    example: agent
                    description: Who starts the conversation - user or agent.
              begin_after_user_silence_ms:
                allOf:
                  - type: integer
                    example: 2000
                    description: >-
                      If set, the AI will begin the conversation after waiting
                      for the user for the duration (in milliseconds) specified
                      by this attribute. This only applies if the agent is
                      configured to wait for the user to speak first. If not
                      set, the agent will wait indefinitely for the user to
                      speak.
                    nullable: true
              global_prompt:
                allOf:
                  - type: string
                    example: You are a helpful customer service agent.
                    description: Global prompt used in every node of the conversation flow.
                    nullable: true
              tools:
                allOf:
                  - type: array
                    items:
                      $ref: '#/components/schemas/NodeTool'
                    description: Tools available in the conversation flow.
                    example:
                      - type: custom
                        name: get_customer_info
                        description: Get customer information from database
                        tool_id: tool_001
                        url: https://api.example.com/customer
                        method: GET
                    nullable: true
              components:
                allOf:
                  - type: array
                    items:
                      $ref: >-
                        #/components/schemas/CreateConversationFlowComponentRequest
                    description: Local components embedded within the conversation flow.
                    nullable: true
              start_node_id:
                allOf:
                  - type: string
                    example: start
                    description: ID of the start node in the conversation flow.
                    nullable: true
              default_dynamic_variables:
                allOf:
                  - type: object
                    additionalProperties:
                      type: string
                    example:
                      company_name: Retell Inc
                      support_hours: 9 AM - 5 PM
                    description: >-
                      Default dynamic variables that can be referenced
                      throughout the conversation flow.
                    nullable: true
              begin_tag_display_position:
                allOf:
                  - type: object
                    properties:
                      x:
                        type: number
                        example: 100
                      'y':
                        type: number
                        example: 200
                    description: Display position for the begin tag in the frontend.
                    nullable: true
              mcps:
                allOf:
                  - type: array
                    items:
                      $ref: '#/components/schemas/MCP'
                    description: >-
                      A list of MCP server configurations to use for this
                      conversation flow.
                    nullable: true
              is_transfer_llm:
                allOf:
                  - type: boolean
                    example: false
                    description: Whether this conversation flow is used for transfer LLM.
                    nullable: true
              nodes:
                allOf:
                  - type: array
                    items:
                      $ref: '#/components/schemas/ConversationFlowNode'
                    description: Array of nodes in the conversation flow.
                    example:
                      - id: start
                        type: conversation
                        instruction:
                          type: prompt
                          text: Greet the customer and ask how you can help them.
                        edges:
                          - id: edge_1
                            transition_condition:
                              type: prompt
                              prompt: Customer wants to book appointment
                            destination_node_id: book_appointment
            description: >-
              Override properties for conversation flow configuration in agent
              override requests.
            refIdentifier: '#/components/schemas/ConversationFlowOverride'
            requiredProperties:
              - conversation_flow_id
              - version
            additionalProperties: false
        examples:
          example:
            value:
              model_choice:
                type: cascading
                model: gpt-5
                high_priority: true
              model_temperature: 0.7
              tool_call_strict_mode: true
              knowledge_base_ids:
                - kb_001
                - kb_002
              kb_config:
                top_k: 3
                filter_score: 0.6
              start_speaker: agent
              begin_after_user_silence_ms: 2000
              global_prompt: You are a helpful customer service agent.
              tools:
                - type: custom
                  name: get_customer_info
                  description: Get customer information from database
                  tool_id: tool_001
                  url: https://api.example.com/customer
                  method: GET
              components:
                - name: Customer Information Collector
                  tools:
                    - type: custom
                      name: get_customer_info
                      description: Get customer information from database
                      tool_id: tool_001
                      url: https://api.example.com/customer
                      method: GET
                  nodes:
                    - id: collect_info
                      type: conversation
                      instruction:
                        type: prompt
                        text: >-
                          Ask the customer for their name and contact
                          information.
                  start_node_id: collect_info
                  begin_tag_display_position:
                    x: 100
                    'y': 200
              start_node_id: start
              default_dynamic_variables:
                company_name: Retell Inc
                support_hours: 9 AM - 5 PM
              begin_tag_display_position:
                x: 100
                'y': 200
              mcps:
                - name: <string>
                  url: <string>
                  headers:
                    Authorization: Bearer 1234567890
                  query_params:
                    index: '1'
                    key: value
                  timeout_ms: 123
              is_transfer_llm: false
              nodes:
                - id: start
                  type: conversation
                  instruction:
                    type: prompt
                    text: Greet the customer and ask how you can help them.
                  edges:
                    - id: edge_1
                      transition_condition:
                        type: prompt
                        prompt: Customer wants to book appointment
                      destination_node_id: book_appointment
              conversation_flow_id: <string>
              version: 123
        description: Successfully retrieved the conversation flow
    '400':
      application/json:
        schemaArray:
          - type: object
            properties:
              status:
                allOf:
                  - type: string
                    enum:
                      - error
              message:
                allOf:
                  - type: string
                    example: Invalid request format, please check API reference.
        examples:
          example:
            value:
              status: error
              message: Invalid request format, please check API reference.
        description: Bad Request
    '401':
      application/json:
        schemaArray:
          - type: object
            properties:
              status:
                allOf:
                  - type: string
                    enum:
                      - error
              message:
                allOf:
                  - type: string
                    example: API key is missing or invalid.
        examples:
          example:
            value:
              status: error
              message: API key is missing or invalid.
        description: Unauthorized
    '404':
      application/json:
        schemaArray:
          - type: object
            properties:
              status:
                allOf:
                  - type: string
                    enum:
                      - error
              message:
                allOf:
                  - type: string
                    example: The requested resource was not found.
        examples:
          example:
            value:
              status: error
              message: The requested resource was not found.
        description: Not Found
    '429':
      application/json:
        schemaArray:
          - type: object
            properties:
              status:
                allOf:
                  - type: string
                    enum:
                      - error
              message:
                allOf:
                  - type: string
                    example: Account rate limited, please throttle your requests.
        examples:
          example:
            value:
              status: error
              message: Account rate limited, please throttle your requests.
        description: Too Many Requests
    '500':
      application/json:
        schemaArray:
          - type: object
            properties:
              status:
                allOf:
                  - type: string
                    enum:
                      - error
              message:
                allOf:
                  - type: string
                    example: An unexpected server error occurred.
        examples:
          example:
            value:
              status: error
              message: An unexpected server error occurred.
        description: Internal Server Error
  deprecated: false
  type: path
components:
  schemas:
    StringAnalysisData:
      type: object
      required:
        - type
        - name
        - description
      properties:
        type:
          type: string
          enum:
            - string
          description: Type of the variable to extract.
          example: string
        name:
          type: string
          description: Name of the variable.
          example: customer_name
        description:
          type: string
          description: Description of the variable.
          example: The name of the customer.
        examples:
          type: array
          items:
            type: string
          description: Examples of the variable value to teach model the style and syntax.
          example:
            - John Doe
            - Jane Smith
    EnumAnalysisData:
      type: object
      required:
        - type
        - name
        - description
        - choices
      properties:
        type:
          type: string
          enum:
            - enum
          description: Type of the variable to extract.
          example: enum
        name:
          type: string
          description: Name of the variable.
          example: product_rating
        description:
          type: string
          description: Description of the variable.
          example: Rating of the product.
        choices:
          type: array
          items:
            type: string
          description: The possible values of the variable, must be non empty array.
          example:
            - good
            - bad
    BooleanAnalysisData:
      type: object
      required:
        - type
        - name
        - description
      properties:
        type:
          type: string
          enum:
            - boolean
          description: Type of the variable to extract.
          example: boolean
        name:
          type: string
          description: Name of the variable.
          example: is_converted
        description:
          type: string
          description: Description of the variable.
          example: Whether the customer converted.
    NumberAnalysisData:
      type: object
      required:
        - type
        - name
        - description
      properties:
        type:
          type: string
          enum:
            - number
          description: Type of the variable to extract.
          example: number
        name:
          type: string
          description: Name of the variable.
          example: order_count
        description:
          type: string
          description: Description of the variable.
          example: How many the customer intend to order.
    AnalysisData:
      oneOf:
        - $ref: '#/components/schemas/StringAnalysisData'
        - $ref: '#/components/schemas/EnumAnalysisData'
        - $ref: '#/components/schemas/BooleanAnalysisData'
        - $ref: '#/components/schemas/NumberAnalysisData'
    LLMModel:
      type: string
      enum:
        - gpt-5
        - gpt-5-mini
        - gpt-5-nano
        - gpt-4o
        - gpt-4o-mini
        - gpt-4.1
        - gpt-4.1-mini
        - gpt-4.1-nano
        - claude-3.7-sonnet
        - claude-3.5-haiku
        - gemini-2.0-flash
        - gemini-2.0-flash-lite
        - gemini-2.5-flash
        - gemini-2.5-flash-lite
      description: Available LLM models for conversation flows
    FinetuneExampleUtterance:
      oneOf:
        - type: object
          required:
            - role
            - content
          properties:
            role:
              type: string
              enum:
                - agent
                - user
            content:
              type: string
        - type: object
          required:
            - role
            - tool_call_id
            - name
            - arguments
          properties:
            role:
              type: string
              enum:
                - tool_call_invocation
            tool_call_id:
              type: string
            name:
              type: string
            arguments:
              type: string
        - type: object
          required:
            - role
            - tool_call_id
            - content
          properties:
            role:
              type: string
              enum:
                - tool_call_result
            tool_call_id:
              type: string
            content:
              type: string
    NodeInstructionPrompt:
      type: object
      required:
        - type
        - text
      properties:
        type:
          type: string
          enum:
            - prompt
          description: Type of instruction
        text:
          type: string
          description: The prompt text for the instruction
    NodeInstructionStaticText:
      type: object
      required:
        - type
        - text
      properties:
        type:
          type: string
          enum:
            - static_text
          description: Type of instruction
        text:
          type: string
          description: The static text for the instruction
    NodeInstruction:
      oneOf:
        - $ref: '#/components/schemas/NodeInstructionPrompt'
        - $ref: '#/components/schemas/NodeInstructionStaticText'
    NodeBase:
      type: object
      required:
        - id
      properties:
        id:
          type: string
          description: Unique identifier for the node
        name:
          type: string
          description: Optional name for display purposes
        global_node_setting:
          $ref: '#/components/schemas/GlobalNodeSetting'
        display_position:
          type: object
          properties:
            x:
              type: number
            'y':
              type: number
          description: Position for frontend display
    ConversationNode:
      allOf:
        - $ref: '#/components/schemas/NodeBase'
        - type: object
          required:
            - type
            - instruction
          properties:
            type:
              type: string
              enum:
                - conversation
              description: Type of the node
            instruction:
              $ref: '#/components/schemas/NodeInstruction'
            skip_response_edge:
              $ref: '#/components/schemas/SkipResponseEdge'
            edges:
              type: array
              items:
                $ref: '#/components/schemas/NodeEdge'
            finetune_conversation_examples:
              type: array
              items:
                $ref: '#/components/schemas/NodeFinetuneConversationExample'
            finetune_transition_examples:
              type: array
              items:
                $ref: '#/components/schemas/NodeFinetuneTransitionExample'
            model_choice:
              $ref: '#/components/schemas/ModelChoice'
            interruption_sensitivity:
              type: number
              minimum: 0
              maximum: 1
            knowledge_base_ids:
              type: array
              items:
                type: string
              example:
                - kb_001
                - kb_002
              description: Knowledge base IDs for RAG (Retrieval-Augmented Generation).
              nullable: true
    EndNode:
      allOf:
        - $ref: '#/components/schemas/NodeBase'
        - type: object
          required:
            - type
          properties:
            type:
              type: string
              enum:
                - end
              description: Type of the node
    FunctionNode:
      allOf:
        - $ref: '#/components/schemas/NodeBase'
        - type: object
          required:
            - type
            - tool_id
            - tool_type
            - wait_for_result
          properties:
            type:
              type: string
              enum:
                - function
              description: Type of the node
            tool_id:
              type: string
              description: Tool ID for function nodes
            tool_type:
              type: string
              enum:
                - local
                - shared
              description: Tool type for function nodes
            speak_during_execution:
              type: boolean
              description: Whether to speak during tool execution
            instruction:
              $ref: '#/components/schemas/NodeInstruction'
            wait_for_result:
              type: boolean
              description: Whether to wait for tool result
            edges:
              type: array
              items:
                $ref: '#/components/schemas/NodeEdge'
            finetune_transition_examples:
              type: array
              items:
                $ref: '#/components/schemas/NodeFinetuneTransitionExample'
            model_choice:
              $ref: '#/components/schemas/ModelChoice'
            interruption_sensitivity:
              type: number
              minimum: 0
              maximum: 1
    TransferCallNode:
      allOf:
        - $ref: '#/components/schemas/NodeBase'
        - type: object
          required:
            - type
            - transfer_destination
            - transfer_option
            - edge
          properties:
            type:
              type: string
              enum:
                - transfer_call
              description: Type of the node
            transfer_destination:
              $ref: '#/components/schemas/TransferDestination'
            ignore_e164_validation:
              type: boolean
              description: >-
                If true, the e.164 validation will be ignored for the
                from_number. This can be useful when you want to dial to
                internal pseudo numbers. This only applies when you are using
                custom telephony and does not apply when you are using Retell
                Telephony. If omitted, the default value is false.
              example: false
            custom_sip_headers:
              type: object
              additionalProperties:
                type: string
              description: Custom SIP headers for transfer calls
            transfer_option:
              type: object
              $ref: '#/components/schemas/TransferOption'
            edge:
              $ref: '#/components/schemas/TransferFailedEdge'
            model_choice:
              $ref: '#/components/schemas/ModelChoice'
    PressDigitNode:
      allOf:
        - $ref: '#/components/schemas/NodeBase'
        - type: object
          required:
            - type
            - instruction
          properties:
            type:
              type: string
              enum:
                - press_digit
              description: Type of the node
            instruction:
              $ref: '#/components/schemas/NodeInstructionPrompt'
            delay_ms:
              type: integer
              description: Delay in milliseconds before pressing the digit
            edges:
              type: array
              items:
                $ref: '#/components/schemas/NodeEdge'
            finetune_transition_examples:
              type: array
              items:
                $ref: '#/components/schemas/NodeFinetuneTransitionExample'
            model_choice:
              $ref: '#/components/schemas/ModelChoice'
    BranchNode:
      allOf:
        - $ref: '#/components/schemas/NodeBase'
        - type: object
          required:
            - type
            - else_edge
          properties:
            type:
              type: string
              enum:
                - branch
              description: Type of the node
            edges:
              type: array
              items:
                $ref: '#/components/schemas/NodeEdge'
            else_edge:
              $ref: '#/components/schemas/ElseEdge'
            finetune_transition_examples:
              type: array
              items:
                $ref: '#/components/schemas/NodeFinetuneTransitionExample'
    SmsNode:
      allOf:
        - $ref: '#/components/schemas/NodeBase'
        - type: object
          required:
            - type
            - instruction
            - success_edge
            - failed_edge
          properties:
            type:
              type: string
              enum:
                - sms
              description: Type of the node
            instruction:
              $ref: '#/components/schemas/NodeInstruction'
            success_edge:
              $ref: '#/components/schemas/SmsSuccessEdge'
            failed_edge:
              $ref: '#/components/schemas/SmsFailedEdge'
    ExtractDynamicVariablesNode:
      allOf:
        - $ref: '#/components/schemas/NodeBase'
        - type: object
          required:
            - type
            - variables
          properties:
            type:
              type: string
              enum:
                - extract_dynamic_variables
              description: Type of the node
            variables:
              type: array
              items:
                $ref: '#/components/schemas/AnalysisData'
            edges:
              type: array
              items:
                $ref: '#/components/schemas/NodeEdge'
            model_choice:
              $ref: '#/components/schemas/ModelChoice'
            finetune_transition_examples:
              type: array
              items:
                $ref: '#/components/schemas/NodeFinetuneTransitionExample'
    AgentSwapNode:
      allOf:
        - $ref: '#/components/schemas/NodeBase'
        - type: object
          required:
            - type
            - agent_id
            - post_call_analysis_setting
            - edge
          properties:
            type:
              type: string
              enum:
                - agent_swap
              description: Type of the node
            agent_id:
              type: string
              description: The ID of the agent to swap to
            agent_version:
              type: number
              description: >-
                The version of the agent to swap to. If not specified, will use
                the latest version
            post_call_analysis_setting:
              $ref: '#/components/schemas/PostCallAnalysisSetting'
              description: Post call analysis setting for the agent swap
            webhook_setting:
              $ref: '#/components/schemas/AgentSwapWebhookSetting'
              description: Webhook setting for the agent swap, defaults to only source.
            edge:
              $ref: '#/components/schemas/TransferFailedEdge'
              description: Edge to transition to if agent swap fails
    MCPNode:
      allOf:
        - $ref: '#/components/schemas/NodeBase'
        - type: object
          required:
            - type
            - mcp_id
            - mcp_tool_name
            - wait_for_result
          properties:
            type:
              type: string
              enum:
                - mcp
              description: Type of the node
            mcp_id:
              type: string
              description: Unique ID of the MCP server
            mcp_tool_name:
              type: string
              description: Name of the MCP tool to call
            edges:
              type: array
              items:
                $ref: '#/components/schemas/NodeEdge'
            response_variables:
              type: object
              additionalProperties:
                type: string
              description: >-
                Response variables to add to dynamic variables, key is the
                variable name, value is the path to the variable in the response
            speak_during_execution:
              type: boolean
              description: If true, will speak during execution
            instruction:
              $ref: '#/components/schemas/NodeInstruction'
              description: >-
                What to say when calling the function, only used when speak
                during execution
            wait_for_result:
              type: boolean
              description: If true, will wait for result before transitioning to next node
            finetune_transition_examples:
              type: array
              items:
                $ref: '#/components/schemas/NodeFinetuneTransitionExample'
            interruption_sensitivity:
              type: number
              minimum: 0
              maximum: 1
    ConversationFlowCustomTool:
      type: object
      required:
        - type
        - name
        - url
      properties:
        type:
          type: string
          enum:
            - custom
          description: Type of the tool
        name:
          type: string
          description: Name of the tool
        description:
          type: string
          maxLength: 1024
          description: Description of the tool
        parameters:
          $ref: '#/components/schemas/ToolParameter'
          description: Tool parameters schema
        url:
          type: string
          description: >-
            Server URL to call the tool. Dynamic variables can be used in the
            URL.
        headers:
          type: object
          additionalProperties:
            type: string
          description: Headers to add to the request
        method:
          type: string
          enum:
            - GET
            - POST
            - PUT
            - PATCH
            - DELETE
          description: HTTP method to use for the request, defaults to POST
        timeout_ms:
          type: integer
          minimum: 1000
          maximum: 600000
          description: Timeout in milliseconds for the function call, defaults to 2 min
        query_params:
          type: object
          additionalProperties:
            type: string
          description: Query parameters to add to the request
        response_variables:
          type: object
          additionalProperties:
            type: string
          description: >-
            Response variables to add to the dynamic variables, key is the
            variable name, value is the path to the variable in the response
    NodeTool:
      allOf:
        - oneOf:
            - $ref: '#/components/schemas/ConversationFlowCustomTool'
            - $ref: '#/components/schemas/CheckAvailabilityCalTool'
            - $ref: '#/components/schemas/BookAppointmentCalTool'
        - type: object
          required:
            - tool_id
          properties:
            tool_id:
              type: string
              description: Unique identifier for the tool
    ConversationFlowNode:
      oneOf:
        - $ref: '#/components/schemas/ConversationNode'
        - $ref: '#/components/schemas/EndNode'
        - $ref: '#/components/schemas/FunctionNode'
        - $ref: '#/components/schemas/TransferCallNode'
        - $ref: '#/components/schemas/PressDigitNode'
        - $ref: '#/components/schemas/BranchNode'
        - $ref: '#/components/schemas/SmsNode'
        - $ref: '#/components/schemas/ExtractDynamicVariablesNode'
        - $ref: '#/components/schemas/AgentSwapNode'
        - $ref: '#/components/schemas/MCPNode'
        - $ref: '#/components/schemas/ComponentNode'
      discriminator:
        propertyName: type
        mapping:
          conversation: '#/components/schemas/ConversationNode'
          end: '#/components/schemas/EndNode'
          function: '#/components/schemas/FunctionNode'
          transfer_call: '#/components/schemas/TransferCallNode'
          press_digit: '#/components/schemas/PressDigitNode'
          branch: '#/components/schemas/BranchNode'
          sms: '#/components/schemas/SmsNode'
          extract_dynamic_variables: '#/components/schemas/ExtractDynamicVariablesNode'
          agent_swap: '#/components/schemas/AgentSwapNode'
          mcp: '#/components/schemas/MCPNode'
          component: '#/components/schemas/ComponentNode'
    ComponentNode:
      allOf:
        - $ref: '#/components/schemas/NodeBase'
        - type: object
          required:
            - type
            - component_id
            - component_type
            - else_edge
          properties:
            type:
              type: string
              enum:
                - component
              description: Type of the node
            component_id:
              type: string
              description: The reference ID of the component
            component_type:
              type: string
              enum:
                - local
                - shared
              description: >
                Type of component:

                - local: stored in conversation flow's components array

                - shared: stored in stand-alone conversation-flow-component
                table
            edges:
              type: array
              items:
                $ref: '#/components/schemas/NodeEdge'
              description: Array of edges for conditional transitions
            else_edge:
              $ref: '#/components/schemas/ElseEdge'
              description: Default edge when no other conditions are met
    ElseEdge:
      allOf:
        - $ref: '#/components/schemas/NodeEdge'
        - type: object
          required:
            - transition_condition
          properties:
            transition_condition:
              type: object
              required:
                - type
                - prompt
              properties:
                type:
                  type: string
                  enum:
                    - prompt
                prompt:
                  type: string
                  enum:
                    - Else
                  description: Must be "Else" for else edge
    SmsSuccessEdge:
      allOf:
        - $ref: '#/components/schemas/NodeEdge'
        - type: object
          required:
            - transition_condition
          properties:
            transition_condition:
              type: object
              required:
                - type
                - prompt
              properties:
                type:
                  type: string
                  enum:
                    - prompt
                prompt:
                  type: string
                  enum:
                    - Sent successfully
                  description: Must be "sent successfully" for SMS success edge
    SmsFailedEdge:
      allOf:
        - $ref: '#/components/schemas/NodeEdge'
        - type: object
          required:
            - transition_condition
          properties:
            transition_condition:
              type: object
              required:
                - type
                - prompt
              properties:
                type:
                  type: string
                  enum:
                    - prompt
                prompt:
                  type: string
                  enum:
                    - Failed to send
                  description: Must be "failed to send" for SMS failed edge
    SkipResponseEdge:
      allOf:
        - $ref: '#/components/schemas/NodeEdge'
        - type: object
          required:
            - transition_condition
          properties:
            transition_condition:
              type: object
              required:
                - type
                - prompt
              properties:
                type:
                  type: string
                  enum:
                    - prompt
                prompt:
                  type: string
                  enum:
                    - Skip response
                  description: Must be "Skip response" for skip response edge
    GlobalNodeFinetuneTransitionExample:
      type: object
      required:
        - transcript
      properties:
        transcript:
          type: array
          items:
            $ref: '#/components/schemas/FinetuneExampleUtterance'
          description: Find tune the transition condition to this global node
    GlobalNodeSetting:
      type: object
      required:
        - condition
      properties:
        condition:
          type: string
          description: Condition for global node activation, cannot be empty
        positive_finetune_examples:
          type: array
          items:
            $ref: '#/components/schemas/GlobalNodeFinetuneTransitionExample'
          description: Transition to this node
        negative_finetune_examples:
          type: array
          items:
            $ref: '#/components/schemas/GlobalNodeFinetuneTransitionExample'
          description: Don't transition to this node
    TransferFailedEdge:
      allOf:
        - $ref: '#/components/schemas/NodeEdge'
        - type: object
          required:
            - transition_condition
          properties:
            transition_condition:
              type: object
              required:
                - type
                - prompt
              properties:
                type:
                  type: string
                  enum:
                    - prompt
                prompt:
                  type: string
                  enum:
                    - Transfer failed
                  description: Must be "Transfer failed" for transfer failed edge
    NodeEdge:
      type: object
      required:
        - id
        - transition_condition
      properties:
        id:
          type: string
          description: Unique identifier for the edge
        transition_condition:
          oneOf:
            - $ref: '#/components/schemas/PromptCondition'
            - $ref: '#/components/schemas/EquationCondition'
        destination_node_id:
          type: string
          description: ID of the destination node
    PromptCondition:
      type: object
      required:
        - type
        - prompt
      properties:
        type:
          type: string
          enum:
            - prompt
        prompt:
          type: string
          description: Prompt condition text
    EquationCondition:
      type: object
      required:
        - type
        - equations
        - operator
      properties:
        type:
          type: string
          enum:
            - equation
        equations:
          type: array
          maxItems: 50
          items:
            $ref: '#/components/schemas/Equation'
        operator:
          type: string
          enum:
            - '||'
            - '&&'
    Equation:
      type: object
      required:
        - left
        - operator
      properties:
        left:
          type: string
          description: Left side of the equation
        operator:
          type: string
          enum:
            - '=='
            - '!='
            - '>'
            - '>='
            - <
            - <=
            - contains
            - not_contains
            - exists
            - not_exist
        right:
          type: string
          description: >-
            Right side of the equation. The right side of the equation not
            required when "exists" or "not_exist" are selected.
    NodeFinetuneConversationExample:
      type: object
      required:
        - id
        - transcript
      properties:
        id:
          type: string
          description: Unique identifier for the example
        transcript:
          type: array
          items:
            $ref: '#/components/schemas/FinetuneExampleUtterance'
          description: The example transcript to finetune how the conversation should be.
    NodeFinetuneTransitionExample:
      type: object
      required:
        - id
        - transcript
      properties:
        id:
          type: string
          description: Unique identifier for the example
        transcript:
          type: array
          items:
            $ref: '#/components/schemas/FinetuneExampleUtterance'
          description: The example transcript to finetune how the node should transition.
        destination_node_id:
          type: string
          description: Optional destination node ID
    ModelChoiceCascading:
      type: object
      required:
        - type
        - model
      properties:
        type:
          type: string
          enum:
            - cascading
          description: Type of model choice
        model:
          $ref: '#/components/schemas/LLMModel'
          description: The LLM model to use
        high_priority:
          type: boolean
          description: >-
            Whether to use high priority pool with more dedicated resource,
            default false
    ModelChoice:
      oneOf:
        - $ref: '#/components/schemas/ModelChoiceCascading'
    CreateConversationFlowComponentRequest:
      allOf:
        - $ref: '#/components/schemas/ConversationFlowComponent'
        - type: object
          required:
            - name
            - nodes
    ConversationFlowComponent:
      type: object
      properties:
        name:
          type: string
          description: Name of the component
          example: Customer Information Collector
        tools:
          type: array
          items:
            $ref: '#/components/schemas/NodeTool'
          description: Tools available within the component
          example:
            - type: custom
              name: get_customer_info
              description: Get customer information from database
              tool_id: tool_001
              url: https://api.example.com/customer
              method: GET
          nullable: true
        nodes:
          type: array
          items:
            $ref: '#/components/schemas/ConversationFlowNode'
          description: Nodes that make up the component
          example:
            - id: collect_info
              type: conversation
              instruction:
                type: prompt
                text: Ask the customer for their name and contact information.
        start_node_id:
          type: string
          description: ID of the starting node
          example: collect_info
          nullable: true
        begin_tag_display_position:
          type: object
          properties:
            x:
              type: number
              example: 100
            'y':
              type: number
              example: 200
          description: Display position for the begin tag in the frontend
          nullable: true
    WarmTransferPrompt:
      type: object
      properties:
        type:
          type: string
          enum:
            - prompt
        prompt:
          type: string
          example: Summarize the call in one sentence for the warn handoff.
          description: >-
            The prompt to be used for warm handoff. Can contain dynamic
            variables.
    WarmTransferStaticMessage:
      type: object
      properties:
        type:
          type: string
          enum:
            - static_message
        message:
          type: string
          example: You can take it from here.
          description: >-
            The static message to be used for warm handoff. Can contain dynamic
            variables.
    TransferOptionColdTransfer:
      type: object
      properties:
        type:
          type: string
          enum:
            - cold_transfer
          description: The type of the transfer.
        show_transferee_as_caller:
          type: boolean
          description: >-
            If set to true, will show transferee (the user, not the AI agent) as
            caller when transferring, requires the telephony side to support
            caller id override. Retell Twilio numbers support this option.
      required:
        - type
    TransferOptionWarmTransfer:
      type: object
      properties:
        type:
          type: string
          enum:
            - warm_transfer
          description: The type of the transfer.
        show_transferee_as_caller:
          type: boolean
          description: >-
            If set to true, will show transferee (the user, not the AI agent) as
            caller when transferring, requires the telephony side to support
            caller id override. Retell Twilio numbers support this option.
        agent_detection_timeout_ms:
          type: number
          description: The time to wait before considering transfer fails.
        on_hold_music:
          type: string
          enum:
            - none
            - relaxing_sound
            - uplifting_beats
            - ringtone
          description: The music to play while the caller is being transferred.
        public_handoff_option:
          type: object
          oneOf:
            - $ref: '#/components/schemas/WarmTransferPrompt'
            - $ref: '#/components/schemas/WarmTransferStaticMessage'
          description: >-
            If set, when transfer is successful, will say the handoff message to
            both the transferee and the agent receiving the transfer. Can leave
            either a static message or a dynamic one based on prompt. Set to
            null to disable warm handoff.
        private_handoff_option:
          type: object
          oneOf:
            - $ref: '#/components/schemas/WarmTransferPrompt'
            - $ref: '#/components/schemas/WarmTransferStaticMessage'
          description: >-
            If set, when transfer is connected, will say the handoff message
            only to the agent receiving the transfer. Can leave either a static
            message or a dynamic one based on prompt. Set to null to disable
            warm handoff.
        ivr_option:
          type: object
          $ref: '#/components/schemas/WarmTransferPrompt'
          description: >-
            IVR navigation option to run when doing human detection. This prompt
            will guide the AI on how to navigate the IVR system.
        opt_out_human_detection:
          type: boolean
          description: >-
            If set to true, will not perform human detection for the transfer.
            Default to false.
        opt_out_initial_message:
          type: boolean
          description: >-
            If set to true, AI will not say "Hello" after connecting the call.
            Default to false.
      required:
        - type
    TransferOption:
      oneOf:
        - $ref: '#/components/schemas/TransferOptionColdTransfer'
        - $ref: '#/components/schemas/TransferOptionWarmTransfer'
    PostCallAnalysisSetting:
      type: string
      enum:
        - both_agents
        - only_destination_agent
    AgentSwapWebhookSetting:
      type: string
      enum:
        - both_agents
        - only_destination_agent
        - only_source_agent
    TransferDestinationPredefined:
      type: object
      properties:
        type:
          type: string
          enum:
            - predefined
          description: The type of transfer destination.
        number:
          type: string
          description: >-
            The number to transfer to in E.164 format or a dynamic variable like
            {{transfer_number}}.
        extension:
          type: string
          description: >-
            Extension digits to dial after the main number connects. Sent via
            DTMF. Allow digits, '*', '#', or a dynamic variable like
            {{extension}}.
          example: 123*456#
      required:
        - type
        - number
    TransferDestinationInferred:
      type: object
      properties:
        type:
          type: string
          enum:
            - inferred
          description: The type of transfer destination.
        prompt:
          type: string
          description: >-
            The prompt to be used to help infer the transfer destination. The
            model will take the global prompt, the call transcript, and this
            prompt together to deduce the right number to transfer to. Can
            contain dynamic variables.
      required:
        - type
        - prompt
    TransferDestination:
      oneOf:
        - $ref: '#/components/schemas/TransferDestinationPredefined'
        - $ref: '#/components/schemas/TransferDestinationInferred'
    CheckAvailabilityCalTool:
      type: object
      properties:
        type:
          type: string
          enum:
            - check_availability_cal
        name:
          type: string
          description: >-
            Name of the tool. Must be unique within all tools available to LLM
            at any given time (general tools + state tools + state transitions).
            Must be consisted of a-z, A-Z, 0-9, or contain underscores and
            dashes, with a maximum length of 64 (no space allowed).
        description:
          type: string
          description: >-
            Describes what the tool does, sometimes can also include information
            about when to call the tool.
        cal_api_key:
          type: string
          description: >-
            Cal.com Api key that have access to the cal.com event you want to
            check availability for.
        event_type_id:
          type: number
          description: >-
            Cal.com event type id number for the cal.com event you want to check
            availability for.
        timezone:
          type: string
          description: >-
            Timezone to be used when checking availability, must be in [IANA
            timezone
            database](https://en.wikipedia.org/wiki/List_of_tz_database_time_zones).
            If not specified, will check if user specified timezone in call, and
            if not, will use the timezone of the Retell servers.
      required:
        - type
        - name
        - cal_api_key
        - event_type_id
    BookAppointmentCalTool:
      type: object
      properties:
        type:
          type: string
          enum:
            - book_appointment_cal
        name:
          type: string
          description: >-
            Name of the tool. Must be unique within all tools available to LLM
            at any given time (general tools + state tools + state transitions).
            Must be consisted of a-z, A-Z, 0-9, or contain underscores and
            dashes, with a maximum length of 64 (no space allowed).
        description:
          type: string
          description: >-
            Describes what the tool does, sometimes can also include information
            about when to call the tool.
        cal_api_key:
          type: string
          description: >-
            Cal.com Api key that have access to the cal.com event you want to
            book appointment.
        event_type_id:
          type: number
          description: >-
            Cal.com event type id number for the cal.com event you want to book
            appointment.
        timezone:
          type: string
          description: >-
            Timezone to be used when booking appointment, must be in [IANA
            timezone
            database](https://en.wikipedia.org/wiki/List_of_tz_database_time_zones).
            If not specified, will check if user specified timezone in call, and
            if not, will use the timezone of the Retell servers.
      required:
        - type
        - name
        - cal_api_key
        - event_type_id
    MCP:
      type: object
      properties:
        name:
          type: string
        url:
          type: string
          description: The URL of the MCP server.
        headers:
          type: object
          additionalProperties:
            type: string
          example:
            Authorization: Bearer 1234567890
          description: Headers to add to the MCP connection request.
        query_params:
          type: object
          additionalProperties:
            type: string
          example:
            index: '1'
            key: value
          description: Query parameters to append to the  MCP connection request URL.
        timeout_ms:
          type: integer
          description: >-
            Maximum time to wait for a connection to be established (in
            milliseconds). Default to 120,000 ms (2 minutes).
      required:
        - name
        - url
    ToolParameter:
      type: object
      description: >-
        The parameters the functions accepts, described as a JSON Schema object.
        See [JSON Schema
        reference](https://json-schema.org/understanding-json-schema/) for
        documentation about the format. Omitting parameters defines a function
        with an empty parameter list.
      required:
        - type
        - properties
      properties:
        type:
          type: string
          enum:
            - object
          description: Type must be "object" for a JSON Schema object.
        properties:
          type: object
          additionalProperties: {}
          description: >-
            The value of properties is an object, where each key is the name of
            a property and each value is a schema used to validate that
            property.
        required:
          type: array
          items:
            type: string
          description: >-
            List of names of required property when generating this parameter.
            LLM will do its best to generate the required properties in its
            function arguments. Property must exist in properties.
    KBConfig:
      type: object
      properties:
        top_k:
          type: integer
          minimum: 1
          maximum: 10
          example: 3
          description: Max number of knowledge base chunks to retrieve
        filter_score:
          type: number
          minimum: 0
          maximum: 1
          example: 0.6
          description: Similarity threshold for filtering search results

````
