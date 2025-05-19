export const correctionOfHTMLPrompt = `
  I validated your response to my prompt, and it seems that the generated content you have provided
  does not follow the HTML5 structure.
  Adjust its structure to be valid HTML5.
  Do not rewrite it completely, just fix the problems related to not being valid HTML5 precisely.
  Follow all the requirements from the previous prompt before and don't forget to use the information you generated on the previous step.
  Only return the full changed content, without any explanations or answers from your side.

  As a reference of what structure I expect from you to output use this:
  <section>
    <h2>Understanding Our AI Development Services</h2>
    <p>At Techstack, we pride ourselves on being a leading <strong>AI development company in California</strong>. Our <strong>AI development services in California</strong> are designed to meet the specific needs of businesses across diverse sectors...</p>
  </section>

  <section>
    <h3>What Results Can You Expect with Our AI Expertise?</h3>

    <article>
      <h4>Process Details:</h4>
      <ul>
        <li><strong>Initial Consultation:</strong> Understanding your specific challenges and defining project goals.</li>
        <li><strong>Research and Planning:</strong> Comprehensive analysis and blueprint creation.</li>
        <li><strong>Development and Testing:</strong> Agile development cycles for building AI applications.</li>
        <li><strong>Deployment and Support:</strong> Smooth integration and ongoing support.</li>
      </ul>
    </article>

    <article>
      <h4>Success Metrics:</h4>
      <ul>
        <li><strong>Increased Efficiency:</strong> Automating tasks to save time and resources.</li>
        <li><strong>Improved Decision-Making:</strong> AI-driven insights for strategic decisions.</li>
        <li><strong>Enhanced Customer Experience:</strong> Personalized interactions with AI tools.</li>
      </ul>
    </article>

    <article>
      <h4>Implementation Examples:</h4>
      <ul>
        <li><strong>Healthcare:</strong> Predictive diagnosis and patient care optimization.</li>
        <li><strong>Transportation:</strong> Dynamic route optimization and supply chain management.</li>
      </ul>
    </article>

    <article>
      <h4>Quantifiable Outcomes:</h4>
      <ul>
        <li><strong>Revenue Growth:</strong> 69% revenue increase post-AI integration.</li>
        <li><strong>Customer Satisfaction:</strong> 73% of users report improved service.</li>
        <li><strong>Industrial Impact:</strong> 82% of manufacturing leaders view AI as critical.</li>
      </ul>
    </article>
  </section>

  <section>
    <h3>Our AI Development Services in California: Comprehensive Capabilities</h3>

    <article>
      <h4>Core Capabilities:</h4>
      <ul>
        <li>Machine Learning Models</li>
        <li>Deep Learning Solutions</li>
        <li>Natural Language Processing</li>
        <li>Predictive Analytics</li>
        <li>Computer Vision</li>
      </ul>
    </article>

    <article>
      <h4>Implementation Approaches:</h4>
      <ul>
        <li>Custom Solutions</li>
        <li>End-to-End Services</li>
        <li>Collaborative Development</li>
      </ul>
    </article>

    <article>
      <h4>Integration Methods:</h4>
      <ul>
        <li>Data Integration</li>
        <li>Scalability</li>
        <li>Security</li>
      </ul>
    </article>

    <article>
      <h4>Key Benefits:</h4>
      <ul>
        <li>Innovation</li>
        <li>Affordability</li>
        <li>Expert Support</li>
      </ul>
    </article>
  </section>

  <section>
    <h3>Technology Stack</h3>

    <article>
      <h4>Computer Vision:</h4>
      <ul><li>OpenCV</li><li>NumPy</li></ul>
    </article>

    <article>
      <h4>Deep Learning and Machine Learning:</h4>
      <ul><li>Tensorflow 2</li><li>Keras</li><li>TFLite</li><li>Pytorch</li><li>Scikit-learn</li></ul>
    </article>

    <article>
      <h4>Application:</h4>
      <ul><li>Python</li><li>Flask</li></ul>
    </article>

    <article>
      <h4>Data Storage and Manipulation:</h4>
      <ul><li>Google Cloud Storage</li><li>Pandas</li></ul>
    </article>

    <article>
      <h4>DevOps:</h4>
      <ul><li>Docker</li><li>Kubeflow + GCP Vertex AI</li></ul>
    </article>

    <article>
      <h4>QA:</h4>
      <ul><li>Pytest</li></ul>
    </article>

    <article>
      <h4>Data Visualization:</h4>
      <ul><li>Matplotlib</li><li>Seaborn</li></ul>
    </article>

    <article>
      <h4>CI/CD:</h4>
      <ul><li>Circle CI</li><li>Github</li><li>Google Cloud Platform</li></ul>
    </article>

    <article>
      <h4>Development Environment:</h4>
      <ul><li>Jupyter Notebook</li><li>VertexAI</li></ul>
    </article>
  </section>

  <section>
    <h3>Case Study by Techstack</h3>

    <article>
      <h4>Challenge Descriptions:</h4>
      <p>Clients in manufacturing and healthcare faced quality control and predictive model challenges.</p>
    </article>

    <article>
      <h4>Solutions Implemented:</h4>
      <ul>
        <li><strong>Manufacturing:</strong> Real-time video analysis for defect detection.</li>
        <li><strong>Healthcare:</strong> ML models for patient outcome prediction.</li>
      </ul>
    </article>

    <article>
      <h4>Results Achieved:</h4>
      <ul>
        <li><strong>Manufacturing:</strong> 30% defect reduction, 40% efficiency boost.</li>
        <li><strong>Healthcare:</strong> 50% improvement in patient outcome accuracy.</li>
      </ul>
    </article>

    <article>
      <h4>Client Testimonials:</h4>
      <blockquote>
        Techstack transformed our production line with AI solutions...
      </blockquote>
      <blockquote>
        Our predictive models are now more accurate than ever...
      </blockquote>
    </article>
  </section>

  <section>
    <h3>Industries We Deliver AI Development Services To</h3>

    <ul>
      <li><strong>Manufacturing:</strong> Streamlining processes and reducing costs.</li>
      <li><strong>Healthcare:</strong> Enhancing care and diagnostics.</li>
      <li><strong>Renewable Energy:</strong> Optimizing usage and maintenance.</li>
      <li><strong>Transportation and Logistics:</strong> Forecasting demand, optimizing logistics.</li>
      <li><strong>Digital Transformation:</strong> Driving innovation across sectors.</li>
    </ul>
  </section>

  <section>
    <h3>AI's Beneficial Impact on Industries</h3>

    <article>
      <h4>Manufacturing Sector:</h4>
      <ul>
        <li>Operational Efficiency</li>
        <li>Quality Control</li>
      </ul>
    </article>

    <article>
      <h4>Healthcare Sector:</h4>
      <ul>
        <li>Patient Care</li>
        <li>Workflow Optimization</li>
      </ul>
    </article>

    <article>
      <h4>Renewable Energy:</h4>
      <ul>
        <li>Resource Management</li>
        <li>Sustainability</li>
      </ul>
    </article>

    <article>
      <h4>Transportation:</h4>
      <ul>
        <li>Logistics Efficiency</li>
      </ul>
    </article>

    <article>
      <h4>Economic Potential:</h4>
      <p>AI is projected to contribute $13 trillion to the global economy by 2030.</p>
    </article>
  </section>

  <section>
    <h3>Why Partner with Techstack for Custom AI Services in California</h3>
    <ul>
      <li><strong>Expertise and Experience:</strong> Proven custom AI solutions.</li>
      <li><strong>Trusted Partner Network:</strong> Collaborations that enhance delivery.</li>
      <li><strong>Comprehensive Services:</strong> From ideation to support.</li>
      <li><strong>Client-Centric Approach:</strong> Tailored process to your goals.</li>
    </ul>
  </section>

  <section>
    <h3>The Way We Work</h3>

    <article>
      <h4>Discovery and Research:</h4>
      <ul>
        <li>Data Collection</li>
        <li>Analysis</li>
        <li>Visualization</li>
        <li>Suggestions</li>
      </ul>
    </article>

    <article>
      <h4>Build Proof of Concept (POC):</h4>
      <ul>
        <li>Prototype Design</li>
        <li>Testing</li>
      </ul>
    </article>

    <article>
      <h4>Tuning and Adjustments:</h4>
      <ul>
        <li>Continuous Improvement</li>
      </ul>
    </article>

    <article>
      <h4>Build Product:</h4>
      <ul>
        <li>Architecture Development</li>
        <li>Solution Creation</li>
        <li>Testing and Release</li>
      </ul>
    </article>

    <article>
      <h4>Release and Maintenance:</h4>
      <p>Supporting released products for ongoing success.</p>
    </article>
  </section>

  <section>
    <h3>Our Approach</h3>
    <ul>
      <li><strong>Flexible AI Development</strong></li>
      <li><strong>Solutions for Any Environment</strong></li>
      <li><strong>Balancing Innovation and Practicality</strong></li>
      <li><strong>Tech Community</strong></li>
    </ul>
  </section>

  <section>
    <h3>Custom AI Solutions We Can Build</h3>
    <ul>
      <li><strong>Conversational AI:</strong> Chatbots and virtual assistants.</li>
      <li><strong>Predictive Analytics:</strong> Tools to predict trends.</li>
      <li><strong>Computer Vision:</strong> Real-time image and video analysis.</li>
      <li><strong>Natural Language Processing:</strong> Human-computer interaction models.</li>
    </ul>
  </section>

  <section>
    <h3>AI Development Services in California to Deliver Real Business Value</h3>
    <p>Partner with us to harness AI and transform your business processes.</p>
  </section>

  <section>
    <h2>FAQ</h2>

    <article>
      <h3>What are the benefits of implementing AI in my business?</h3>
      <p>AI enhances efficiency, reduces costs, and improves decision-making through data analytics.</p>
    </article>

    <article>
      <h3>How long does it take to develop an AI solution in California?</h3>
      <p>Development time varies from weeks to months based on complexity and scope.</p>
    </article>

    <article>
      <h3>How to choose an AI software development company in California?</h3>
      <p>Look for experience, customer reviews, scalable solutions, and end-to-end services.</p>
    </article>

    <article>
      <h3>What kind of data do I need to provide?</h3>
      <p>Business-relevant data like customer behavior, transactions, and operations is key.</p>
    </article>
  </section>
`;
